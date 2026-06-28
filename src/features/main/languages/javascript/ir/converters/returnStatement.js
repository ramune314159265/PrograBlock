import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const returnStatementConverter = {
	toIrs: {
		ReturnStatement: (node) => {
			return {
				type: "return_statement",
				content: convertAstToIr(node.argument),
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		return_statement: (node) => {
			return {
				type: "ReturnStatement",
				argument: convertIrToAst(node.content),
				id: node.id ?? null
			};
		},
	},
};
