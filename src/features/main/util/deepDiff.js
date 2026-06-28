const buildIdIndex = (root) => {
	const map = new Map();
	traverse(root, [], map);
	return map;
}

const traverse = (value, path, map) => {
	if (typeof value !== 'object' || value === null) return;

	if (Array.isArray(value)) {
		value.forEach((item, i) => traverse(item, [...path, i], map));
		return;
	}

	if ('id' in value) {
		map.set(value.id, { item: value, path });
	}

	for (const key of Object.keys(value)) {
		traverse(value[key], [...path, key], map);
	}
}

const diffObjects = (oldObj, newObj, path, changes, oldIndex, newIndex) => {
	const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
	for (const key of allKeys) {
		const currentPath = [...path, key];
		const oldVal = oldObj[key];
		const newVal = newObj[key];

		if (!(key in oldObj)) {
			changes.push({ type: 'CREATE', path: currentPath, value: newVal });
		} else if (!(key in newObj)) {
			changes.push({ type: 'REMOVE', path: currentPath, value: oldVal });
		} else {
			diffValues(oldVal, newVal, currentPath, changes, oldIndex, newIndex);
		}
	}
}

const diffArrays = (oldArr, newArr, path, changes, oldIndex, newIndex)  => {
	const hasId = item => typeof item === 'object' && item !== null && 'id' in item;

	const oldWithId = oldArr.filter(hasId);
	const oldWithoutId = oldArr.filter(item => !hasId(item));
	const newWithId = newArr.filter(hasId);
	const newWithoutId = newArr.filter(item => !hasId(item));

	const oldMap = new Map(oldWithId.map(item => [item.id, { item, index: oldArr.indexOf(item) }]));
	const newMap = new Map(newWithId.map(item => [item.id, { item, index: newArr.indexOf(item) }]));

	for (const [id, { item, index }] of oldMap) {
		if (!newMap.has(id)) {
			const movedTo = newIndex.get(id);
			if (movedTo) {
				changes.push({ type: 'MOVE', oldPath: [...path, index], path: movedTo.path, value: item });
				diffObjects(item, movedTo.item, movedTo.path, changes, oldIndex, newIndex);
			} else {
				changes.push({ type: 'REMOVE', path: [...path, index], value: item });
			}
		}
	}

	for (const [id, { item, index: newIdx }] of newMap) {
		if (!oldMap.has(id)) {
			if (!oldIndex.has(id)) {
				changes.push({ type: 'CREATE', path: [...path, newIdx], value: item });
			}
		} else {
			const { item: oldItem, index: oldIdx } = oldMap.get(id);
			if (oldIdx !== newIdx) {
				changes.push({ type: 'MOVE', oldPath: [...path, oldIdx], path: [...path, newIdx], value: item });
			}
			diffObjects(oldItem, item, [...path, newIdx], changes, oldIndex, newIndex);
		}
	}

	const maxLen = Math.max(oldWithoutId.length, newWithoutId.length);
	for (let i = 0; i < maxLen; i++) {
		const oldItem = oldWithoutId[i];
		const newItem = newWithoutId[i];
		const itemPath = [...path, i];
		if (oldItem === undefined) {
			changes.push({ type: 'CREATE', path: itemPath, value: newItem });
		} else if (newItem === undefined) {
			changes.push({ type: 'REMOVE', path: itemPath, value: oldItem });
		} else {
			diffValues(oldItem, newItem, itemPath, changes, oldIndex, newIndex);
		}
	}
}

const diffValues = (oldVal, newVal, path, changes, oldIndex, newIndex) => {
	if (oldVal === newVal) return;

	const oldIsObj = typeof oldVal === 'object' && oldVal !== null;
	const newIsObj = typeof newVal === 'object' && newVal !== null;

	if (!oldIsObj || !newIsObj) {
		if (oldVal !== newVal) {
			changes.push({ type: 'CHANGE', path, oldValue: oldVal, newValue: newVal });
		}
		return;
	}

	if (Array.isArray(oldVal) && Array.isArray(newVal)) {
		diffArrays(oldVal, newVal, path, changes, oldIndex, newIndex);
		return;
	}

	diffObjects(oldVal, newVal, path, changes, oldIndex, newIndex);
}

export const deepDiff = (oldObj, newObj, path = []) => {
	const oldIndex = buildIdIndex(oldObj);
	const newIndex = buildIdIndex(newObj);

	const changes = [];
	diffValues(oldObj, newObj, [], changes, oldIndex, newIndex);
	return changes;
}
