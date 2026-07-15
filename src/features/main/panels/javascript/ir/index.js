import { parse } from "acorn-loose";
import { assignmentExpressionConverter } from "./converters/assignmentExpression";
import { binaryExpressionConverter } from "./converters/binaryExpression";
import { blockStatementConverter } from "./converters/blockStatement";
import { breakStatementConverter } from "./converters/breakStatement";
import { callExpressionConverter } from "./converters/callExpression";
import { conditionalExpressionConverter } from "./converters/conditionalExpression";
import { emptyConverter } from "./converters/empty";
import { expressionStatementConverter } from "./converters/expressionStatement";
import { forStatementConverter } from './converters/forStatemenet';
import { functionDeclarationConverter } from "./converters/functionDeclaration";
import { identifierConverter } from "./converters/identifier";
import { ifStatementConverter } from "./converters/ifStatement";
import { LiteralConverter } from "./converters/literal";
import { memberExpressionConverter } from "./converters/memberExpression";
import { parenthesizedExpressionConverter } from "./converters/parenthesizedExpression";
import { programConverter } from "./converters/program";
import { returnStatementConverter } from "./converters/returnStatement";
import { switchCaseConverter } from "./converters/switchCase";
import { switchStatementConverter } from "./converters/switchStatement";
import { unaryExpressionConverter } from "./converters/unaryExpression";
import { variableDeclarationConverter } from "./converters/variableDeclaration";

const converters = [
	assignmentExpressionConverter,
	binaryExpressionConverter,
	blockStatementConverter,
	breakStatementConverter,
	callExpressionConverter,
	conditionalExpressionConverter,
	expressionStatementConverter,
	forStatementConverter,
	functionDeclarationConverter,
	identifierConverter,
	ifStatementConverter,
	LiteralConverter,
	memberExpressionConverter,
	parenthesizedExpressionConverter,
	programConverter,
	returnStatementConverter,
	switchCaseConverter,
	switchStatementConverter,
	unaryExpressionConverter,
	variableDeclarationConverter,
	emptyConverter,
];

export const toIrConverters = {};
export const toJavaScriptConverters = {};
converters.forEach((c) => {
	Object.entries(c.toIrs).forEach(([k, v]) => (toIrConverters[k] = v));
	Object.entries(c.toJavaScripts).forEach(([k, v]) => {
		toJavaScriptConverters[k] = v;
	});
});

export const convertAstToIr = (node) => {
	const converter = toIrConverters[node?.type];
	if (!converter) {
		return null;
	}
	return converter(node);
};

export const convertAstsToIr = (node) => {
	return (node?.map?.(convertAstToIr) ?? []).filter(i => i?.type)
}

export const convertJavaScriptToIr = (code) => {
	const ast = parse(code, {
		ecmaVersion: 2020,
		sourceType: "script",
	});
	console.log({ ast })
	return convertAstToIr(ast);
};

export const convertIrToAst = (node) => {
	const converter = toJavaScriptConverters[node?.type];
	if (!converter) {
		return node;
	}
	const ast = converter(node);
	return ast;
};

export const convertIrToAstTree = (node) => {
	return node?.map?.(convertIrToAst);
};
