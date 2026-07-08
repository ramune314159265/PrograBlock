import {
	arrayToObjectChain,
	objectChainToArray,
} from "../../../util/objectArray";
import { assignmentExpressionConverter } from "./converters/assignmentExpression";
import { binaryExpressionConverter } from "./converters/binaryExpression";
import { blockStatementConverter } from "./converters/blockStatement";
import { breakStatementConverter } from "./converters/breakStatement";
import { callExpressionConverter } from "./converters/callExpression";
import { conditionalExpressionConverter } from "./converters/conditionalExpression";
import { expressionExpressionConverter } from "./converters/expressionStatement";
import { functionDeclarationConverter } from "./converters/functionDeclaration";
import { identifierConverter } from "./converters/identifier";
import { ifStatementConverter } from "./converters/ifStatement";
import { literalConverter } from "./converters/literal";
import { returnStatementConverter } from "./converters/returnStatement";
import { switchCaseConverter } from "./converters/switchCase";
import { switchStatementConverter } from "./converters/switchStatement";
import { variableDeclarationConverter } from "./converters/variableDeclaration";

const converters = [
	assignmentExpressionConverter,
	binaryExpressionConverter,
	blockStatementConverter,
	breakStatementConverter,
	callExpressionConverter,
	conditionalExpressionConverter,
	expressionExpressionConverter,
	functionDeclarationConverter,
	identifierConverter,
	ifStatementConverter,
	literalConverter,
	returnStatementConverter,
	switchCaseConverter,
	switchStatementConverter,
	variableDeclarationConverter,
];

export const toIrConverters = {};
export const toBlockConverters = {};
converters.forEach((c) => {
	Object.entries(c.toIrs).forEach(([k, v]) => (toIrConverters[k] = v));
	Object.entries(c.toBlocks).forEach(([k, v]) => {
		toBlockConverters[k] = v;
	});
});

export const convertBlockToIr = (node) => {
	if (!node) {
		return;
	}
	const converter = toIrConverters[node?.type];
	if (!converter) {
		return node;
	}
	return converter(node);
};

export const convertBlockChainToIr = (node) => {
	if (!node) {
		return;
	}
	const array = objectChainToArray(node, ["next", "block"]);
	return array.map(convertBlockToIr);
};

export const convertBlocklyToIr = (data) => {
	const blocks = data.blocks.blocks;
	return blocks.map((b) => convertBlockChainToIr(b));
};

export const convertIrToBlock = (node) => {
	const converter = toBlockConverters[node?.type];
	if (!converter) {
		return node;
	}
	const block = converter(node);
	return block;
};

export const convertIrToBlockChain = (node) => {
	const arrayConverted = node.map(convertIrToBlock);
	return arrayToObjectChain(arrayConverted, ["next", "block"]);
};

export const convertIrToBlockly = (node) => {
	return convertIrToBlockChain(node);
};
