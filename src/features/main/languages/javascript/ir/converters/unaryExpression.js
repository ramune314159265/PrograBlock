import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const unaryExpressionConverter = {
	toIrs: {
		UnaryExpression: (node) => {
			return {
				type: "unary_expression",
				operator: node.operator,
				content: convertAstToIr(node.argument),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		unary_expression: (node) => {
			return {
				type: "UnaryExpression",
				operator: node.operator,
				argument: convertIrToAst(node.content),
				uid: node?.uid ?? null
			};
		},
	},
};
