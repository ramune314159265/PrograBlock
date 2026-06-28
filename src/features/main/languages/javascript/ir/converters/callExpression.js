import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const callExpressionConverter = {
	toIrs: {
		CallExpression: (node) => {
			return {
				type: "call_expression",
				function: convertAstToIr(node.callee),
				arguments: node.arguments.map(convertAstToIr),
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		call_expression: (node) => {
			return {
				type: "CallExpression",
				callee: convertIrToAst(node.function),
				arguments: node.arguments.map(convertIrToAst),
				id: node.id ?? null
			};
		},
	},
};
