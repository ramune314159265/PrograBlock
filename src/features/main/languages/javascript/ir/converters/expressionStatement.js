import { convertAstToIr, convertIrToAst } from "..";

export const expressionStatementConverter = {
	toIrs: {
		ExpressionStatement: (node) => {
			return {
				type: "expression_statement",
				content: convertAstToIr(node.expression),
			};
		},
	},
	toJavaScripts: {
		expression_statement: (node) => {
			return {
				type: "ExpressionStatement",
				expression: convertIrToAst(node.content),
			};
		},
	},
};
