import { convertAstToIr, convertIrToAst } from "..";

export const unaryExpressionConverter = {
	toIrs: {
		UnaryExpression: (node) => {
			return {
				type: "unary_expression",
				operator: node.operator,
				content: convertAstToIr(node.argument),
			};
		},
	},
	toJavaScripts: {
		unary_expression: (node) => {
			return {
				type: "UnaryExpression",
				operator: node.operator,
				argument: convertIrToAst(node.content),
			};
		},
	},
};
