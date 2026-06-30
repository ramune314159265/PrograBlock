
/**
 * A → A' の変更（追加・移動・削除・値の更新）を、メタデータ付きの B に適用して
 * B'（A' と同じ構造で、可能な限り B のメタデータを保持したもの）を生成する。
 *
 * 【識別ルール】
 * 1. id（プロパティ名は options.idKey で変更可。デフォルトは 'id'）を持つ
 *    プレーンオブジェクトは「id が同じなら同じノード」とみなし、配列内での
 *    位置が変わっていても（=移動）、各プロパティを再帰的に diff/適用する。
 *    対応する B 側のノードのメタデータは維持される。
 * 2. id を持たないもの（プリミティブ値・配列・id無しオブジェクト）は「値」として扱う。
 *    A と A' で完全一致すれば無変更、一致しなければそのノード（部分木）を
 *    丸ごと A' の内容で置き換える（B 側のメタデータは失われる）。
 *    ※ 配列要素がオブジェクトの場合は必ず id を持つ前提（呼び出し側で保証すること）。
 *      文字列・数値などのプリミティブ配列は「配列全体を1つの値」として扱う。
 *
 * 【前提】
 * - B は「変更前の A」と同じ構造（idキー以外のキー構成・配列順序）を持つ
 *   （メタデータプロパティが追加されている点だけが異なる）。
 * - メタデータのプロパティ名はあらかじめ決まっており、呼び出し側が指定する。
 * - id プロパティは B には存在しないため、新規追加ノードを B' に組み込む際は
 *   id を取り除いてコピーする。
 * - options.removeMetadataKeys に指定したキーは、B に存在していても B' には
 *   引き継がれず削除される（不要になったメタデータの掃除用）。
 *
 * @param {*} A 変更前のオブジェクト/配列/プリミティブ（id あり）
 * @param {*} APrime 変更後のオブジェクト/配列/プリミティブ（id あり）
 * @param {*} B A と同じ構造でメタデータを持つオブジェクト（id なし）
 * @param {{ metadataKeys: string[], removeMetadataKeys?: string[], idKey?: string }} options
 *   metadataKeys: メタデータとして扱うプロパティ名一覧（Bからこれらのキーを引き継ぐ）
 *   removeMetadataKeys: そのうち、今回B'には引き継がず削除したいキー名一覧（省略可）
 *   idKey: 識別子として使うプロパティ名（省略時は 'id'）
 * @returns {*} B' （B にメタデータを保持したまま A→A' の変更を適用した結果）
 */
export function applyDiff(A, APrime, B, options) {
	const metadataKeys = (options && options.metadataKeys) || [];
	const removeMetadataKeys = (options && options.removeMetadataKeys) || [];
	const idKey = (options && options.idKey) || 'id';
	const removeSet = new Set(removeMetadataKeys);
	// 削除対象のキーは「引き継ぐメタデータ」のリストから外しておく。
	// こうすると以降のマージ処理（mergeIdObject / mergeContainerObject）は
	// 一切変更せずに、自動的にそのキーをコピーしなくなる＝結果から消える。
	const keysToPreserve = metadataKeys.filter((key) => !removeSet.has(key));

	// --- フェーズ1: A と B を構造的な位置（同じキー・同じ配列index）で
	//     同時にたどり、id → A側ノード / id → B側ノード のグローバルな対応表を作る。
	//     これにより、A' の中で id 付きオブジェクトがどこに移動していても
	//     元の A・B のノードをすぐに引き当てられる。
	const idToANode = new Map();
	const idToBNode = new Map();
	buildIdMaps(A, B, idToANode, idToBNode, idKey);

	// --- フェーズ2+3: A' を辿りながら、A側の対応ノード（あれば）と比較しつつ
	//     B側の対応ノード（あれば）からメタデータを引き継いで B' を組み立てる。
	return mergeValue(A, APrime, B, idToANode, idToBNode, keysToPreserve, idKey);
}

/* ----------------------------- フェーズ1 ----------------------------- */

function buildIdMaps(aVal, bVal, idToANode, idToBNode, idKey) {
	if (Array.isArray(aVal)) {
		if (!Array.isArray(bVal)) return; // 構造が想定とずれている場合は対応付けを諦める
		const len = Math.min(aVal.length, bVal.length);
		for (let i = 0; i < len; i++) {
			buildIdMaps(aVal[i], bVal[i], idToANode, idToBNode, idKey);
		}
		return;
	}

	if (isPlainObject(aVal)) {
		if (!isPlainObject(bVal)) return;

		if (hasId(aVal, idKey)) {
			idToANode.set(aVal[idKey], aVal);
			idToBNode.set(aVal[idKey], bVal);
		}

		for (const key of Object.keys(aVal)) {
			if (key === idKey) continue;
			if (Object.prototype.hasOwnProperty.call(bVal, key)) {
				buildIdMaps(aVal[key], bVal[key], idToANode, idToBNode, idKey);
			}
		}
		return;
	}

	// プリミティブは対応付け不要
}

/* --------------------------- フェーズ2+3 ----------------------------- */

function mergeValue(aVal, aPrimeVal, bVal, idToANode, idToBNode, metadataKeys, idKey) {
	if (Array.isArray(aPrimeVal)) {
		return mergeArray(aVal, aPrimeVal, bVal, idToANode, idToBNode, metadataKeys, idKey);
	}

	if (isPlainObject(aPrimeVal)) {
		if (hasId(aPrimeVal, idKey)) {
			const id = aPrimeVal[idKey];
			const aNode = idToANode.get(id); // 元々どこにあったか（移動していても見つかる）
			const bNode = idToBNode.get(id); // 対応する B 側ノード（メタデータの引き継ぎ元）
			return mergeIdObject(aNode, aPrimeVal, bNode, idToANode, idToBNode, metadataKeys, idKey);
		}

		// id無しオブジェクト:
		// - 配下（再帰的）に id 付きオブジェクトが一切含まれない「純粋な値」なら、
		//   完全一致でなければ丸ごと置換する（B側のメタデータは失われる）。
		// - 配下に id 付きオブジェクト/配列が含まれる場合は、それらの id 追跡を
		//   壊さないようにキーごとに再帰し、位置対応で B 側のメタデータを維持する。
		if (containsIdDescendant(aPrimeVal, idKey) || containsIdDescendant(aVal, idKey)) {
			return mergeContainerObject(aVal, aPrimeVal, bVal, idToANode, idToBNode, metadataKeys, idKey);
		}
		if (deepEqual(aVal, aPrimeVal)) {
			return bVal !== undefined ? bVal : stripIdsDeep(aPrimeVal, idKey);
		}
		return stripIdsDeep(aPrimeVal, idKey);
	}

	// プリミティブ
	if (deepEqual(aVal, aPrimeVal)) {
		return bVal !== undefined ? bVal : aPrimeVal;
	}
	return aPrimeVal;
}

function mergeArray(aArr, aPrimeArr, bArr, idToANode, idToBNode, metadataKeys, idKey) {
	if (isIdObjectArray(aPrimeArr, idKey)) {
		// id付きオブジェクトの配列: A' の並び順そのままに、
		// 各要素を id でグローバルに引き当てて再帰的にマージする。
		// → 追加/削除/移動はこの map() を A' の順序でなぞるだけで自然に表現される。
		return aPrimeArr.map((elPrime) => {
			const id = elPrime[idKey];
			const aNode = idToANode.get(id);
			const bNode = idToBNode.get(id);
			return mergeIdObject(aNode, elPrime, bNode, idToANode, idToBNode, metadataKeys, idKey);
		});
	}

	// 全要素が id 付きとは限らないが、どこかに id 付き子孫を含む場合の保険:
	// （本来「配列内のオブジェクトは必ず id を持つ」前提だが、想定外の構造でも
	//  id 追跡が壊れないよう、要素ごとに位置対応で再帰する）
	if (containsIdDescendant(aPrimeArr, idKey) || containsIdDescendant(aArr, idKey)) {
		return aPrimeArr.map((elPrime, i) => {
			const aEl = Array.isArray(aArr) ? aArr[i] : undefined;
			const bEl = Array.isArray(bArr) ? bArr[i] : undefined;
			return mergeValue(aEl, elPrime, bEl, idToANode, idToBNode, metadataKeys, idKey);
		});
	}

	// 純粋なプリミティブ配列など: 配列全体を1つの値として扱う。
	if (deepEqual(aArr, aPrimeArr)) {
		return bArr !== undefined ? bArr : stripIdsDeep(aPrimeArr, idKey);
	}
	return stripIdsDeep(aPrimeArr, idKey);
}

function mergeIdObject(aNode, aPrimeNode, bNode, idToANode, idToBNode, metadataKeys, idKey) {
	const result = {};

	// B側のメタデータを先に引き継ぐ
	if (isPlainObject(bNode)) {
		for (const key of metadataKeys) {
			if (Object.prototype.hasOwnProperty.call(bNode, key)) {
				result[key] = deepClone(bNode[key]);
			}
		}
	}

	// A' の構造的なプロパティを再帰的にマージ（id 自体は B に持たせないので除外）
	for (const key of Object.keys(aPrimeNode)) {
		if (key === idKey) continue;
		const aChildVal = isPlainObject(aNode) ? aNode[key] : undefined;
		const aPrimeChildVal = aPrimeNode[key];
		const bChildVal = isPlainObject(bNode) ? bNode[key] : undefined;
		result[key] = mergeValue(aChildVal, aPrimeChildVal, bChildVal, idToANode, idToBNode, metadataKeys, idKey);
	}

	return result;
}

/**
 * id を持たない「入れ物」オブジェクト（例: settings のうち、配下に id 付き
 * オブジェクト/配列を含むもの）をキーごとに再帰的にマージする。
 * 識別は完全一致ではなく位置対応（aVal/aPrimeVal/bVal が既に同じスロットを
 * 指している）によるため、id によるグローバル検索は行わない。
 */
function mergeContainerObject(aVal, aPrimeVal, bVal, idToANode, idToBNode, metadataKeys, idKey) {
	const result = {};

	if (isPlainObject(bVal)) {
		for (const key of metadataKeys) {
			if (Object.prototype.hasOwnProperty.call(bVal, key)) {
				result[key] = deepClone(bVal[key]);
			}
		}
	}

	for (const key of Object.keys(aPrimeVal)) {
		const aChildVal = isPlainObject(aVal) ? aVal[key] : undefined;
		const aPrimeChildVal = aPrimeVal[key];
		const bChildVal = isPlainObject(bVal) ? bVal[key] : undefined;
		result[key] = mergeValue(aChildVal, aPrimeChildVal, bChildVal, idToANode, idToBNode, metadataKeys, idKey);
	}

	return result;
}

/** value（再帰的に見て）の中のどこかに id 付きオブジェクトが含まれるか */
function containsIdDescendant(value, idKey) {
	if (Array.isArray(value)) {
		return value.some((v) => containsIdDescendant(v, idKey));
	}
	if (isPlainObject(value)) {
		if (hasId(value, idKey)) return true;
		return Object.keys(value).some((key) => containsIdDescendant(value[key], idKey));
	}
	return false;
}

/* ------------------------------ ユーティリティ ------------------------------ */

function isPlainObject(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasId(value, idKey) {
	return isPlainObject(value) && Object.prototype.hasOwnProperty.call(value, idKey);
}

function isIdObjectArray(arr, idKey) {
	return Array.isArray(arr) && arr.length > 0 && arr.every((el) => hasId(el, idKey));
}

function stripIdsDeep(value, idKey) {
	if (Array.isArray(value)) {
		return value.map((v) => stripIdsDeep(v, idKey));
	}
	if (isPlainObject(value)) {
		const out = {};
		for (const key of Object.keys(value)) {
			if (key === idKey) continue;
			out[key] = stripIdsDeep(value[key], idKey);
		}
		return out;
	}
	return value;
}

function deepClone(value) {
	if (Array.isArray(value)) return value.map(deepClone);
	if (isPlainObject(value)) {
		const out = {};
		for (const key of Object.keys(value)) out[key] = deepClone(value[key]);
		return out;
	}
	return value;
}

function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;

	if (Array.isArray(a) || Array.isArray(b)) {
		if (!Array.isArray(a) || !Array.isArray(b)) return false;
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false;
		}
		return true;
	}

	if (isPlainObject(a) || isPlainObject(b)) {
		if (!isPlainObject(a) || !isPlainObject(b)) return false;
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);
		if (aKeys.length !== bKeys.length) return false;
		for (const key of aKeys) {
			if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}

	// NaN同士は等しいとみなす
	if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
		return true;
	}

	return false;
}
