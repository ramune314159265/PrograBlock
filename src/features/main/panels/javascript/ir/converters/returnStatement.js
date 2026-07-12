import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const returnStatementConverter = {
	toIrs: {
		ReturnStatement: (node) => {
			return {
				type: "return_statement",
				content: convertAstToIr(node.argument),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		return_statement: (node) => {
			return {
				type: "ReturnStatement",
				argument: convertIrToAst(node.content),
				uid: node?.uid ?? null
			};
		},
	},
};
