import { arrayToObjectChain, objectChainToArray } from '../../../util/objectArray';
import { assignmentExpressionConverter } from './converters/assignmentExpression';

const converters = [
	assignmentExpressionConverter
];

export const toIrConverters = {};
export const toBlockConverters = {};
converters.forEach((c) => {
	Object.entries(c.toIrs).forEach(([k, v]) => (toIrConverters[k] = v));
	Object.entries(c.toJavaScripts).forEach(([k, v]) => {
		toBlockConverters[k] = v;
	});
});

export const convertBlockToIr = (node) => {
	const converter = toIrConverters[node?.type];
	if (!converter) {
		return node;
	}
	return converter(node);
};

export const convertBlockChainToIr = (node) => {
	const array = objectChainToArray(node)
	return array.map(convertBlockToIr)
}

export const convertIrToBlockChain = (node) => {
	const arrayConverted = node.map(convertIrToBlock)
	return arrayToObjectChain(arrayConverted)
}

export const convertIrToBlock = (node) => {
	const converter = toBlockConverters[node?.type];
	if (!converter) {
		return node;
	}
	const block = converter(node);
	return block;
};

export const convertIrToBlockTree = (node) => {
	return node?.map(convertIrToBlock);
};
