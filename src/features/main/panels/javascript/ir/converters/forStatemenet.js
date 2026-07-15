import { nanoid } from 'nanoid';
import { convertAstsToIr, convertAstToIr, convertIrToAst } from "..";

export const forStatementConverter = {
	toIrs: {
		ForStatement: (node) => {
			return {
				type: "for_statement",
				variable: node.init?.declarations[0]?.id?.name ?? '',
				init: convertAstToIr(node.init?.declarations[0]?.init),
				condition: convertAstToIr(node.test),
				update: convertAstToIr(node.update),
				content: convertAstsToIr(node?.body?.body),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		for_statement: (node) => {
			return {
				type: "ForStatement",
				init: {
					type: 'VariableDeclaration',
					kind: 'let',
					declarations: [
						{
							type: "VariableDeclarator",
							id: {
								type: "Identifier",
								name: node.variable,
							},
							init: convertIrToAst(node.init),
						},
					]
				},
				test: convertIrToAst(node.condition),
				update: convertIrToAst(node.update),
				body: {
					type: "BlockStatement",
					body: node.content?.map(convertIrToAst),
				},
				uid: node?.uid ?? null
			};
		},
	},
};
