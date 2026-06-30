import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const variableDeclarationConverter = {
	toIrs: {
		VariableDeclaration: (node) => {
			return {
				type: "variable_declaration",
				variableType: node.kind,
				name: node.declarations[0].id.name,
				value: convertAstToIr(node.declarations[0].init),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		variable_declaration: (node) => {
			return {
				type: "VariableDeclaration",
				kind: node.variableType,
				declarations: [
					{
						type: "VariableDeclarator",
						id: {
							type: "Identifier",
							name: node.name,
						},
						init: convertIrToAst(node.value),
					},
				],
				uid: node?.uid ?? null
			};
		},
	},
};
