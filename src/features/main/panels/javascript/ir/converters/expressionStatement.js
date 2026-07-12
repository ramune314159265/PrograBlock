import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const expressionStatementConverter = {
	toIrs: {
		ExpressionStatement: (node) => {
			return {
				type: "expression_statement",
				content: convertAstToIr(node.expression),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		expression_statement: (node) => {
			return {
				type: "ExpressionStatement",
				expression: convertIrToAst(node.content),
				uid: node?.uid ?? null
			};
		},
	},
};
