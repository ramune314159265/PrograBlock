import { getFromPath } from "./getFromPath";

export const objectChainToArray = (object, properties = ["next"]) => {
	const array = [];
	const dig = (o) => {
		const data = structuredClone(o);
		delete data[properties[0]];
		array.push(data);
		const next = getFromPath(o, properties);
		if (!next) {
			return;
		}
		dig(next);
	};
	dig(object);
	return array;
};

export const arrayToObjectChain = (array, properties = ["next"]) => {
	const object = {};
	let last = object;
	array.forEach((e, i) => {
		Object.assign(last, e);
		if (i === array.length - 1) {
			return;
		}

		const next = properties.reduce((o, p) => {
			return (o[p] = {});
		}, last);
		last = next;
	});
	return object;
};
