import { nanoid } from 'nanoid';
import { convertAstsToIr, convertAstToIr, convertIrToAst } from "..";

export const ifStatementConverter = {
	toIrs: {
		IfStatement: (node) => {
			return {
				type: "if_statement",
				condition: convertAstToIr(node.test),
				content: convertAstsToIr(node.consequent?.body),
				alternative: convertAstsToIr(node.alternate?.body),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		if_statement: (node) => {
			return {
				type: "IfStatement",
				test: convertIrToAst(node.condition),
				consequent: {
					type: "BlockStatement",
					body: node.content?.map(convertIrToAst),
				},
				alternate: {
					type: "BlockStatement",
					body: node.alternative?.map(convertIrToAst),
				},
				uid: node?.uid ?? null
			};
		},
	},
};
