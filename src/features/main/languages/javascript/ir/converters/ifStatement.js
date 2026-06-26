import { convertAstToIr, convertIrToAst } from "..";

export const ifStatementConverter = {
	toIrs: {
		IfStatement: (node) => {
			return {
				type: "if_statement",
				condition: convertAstToIr(node.test),
				content: node.consequent.body.map(convertAstToIr),
				alternative: node.alternate?.body?.map?.(convertAstToIr),
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
					body: node.content.map(convertIrToAst),
				},
				alternate: {
					type: "BlockStatement",
					body: node.alternative?.map(convertIrToAst),
				},
			};
		},
	},
};
