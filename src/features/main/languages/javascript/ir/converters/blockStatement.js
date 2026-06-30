import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const blockStatementConverter = {
	toIrs: {
		BlockStatement: (node) => {
			return {
				type: "block_statement",
				content: convertAstToIr(node.body),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		block_statement: (node) => {
			return {
				type: "BlockStatement",
				body: convertIrToAst(node.content),
				uid: node?.uid ?? null
			};
		},
	},
};
