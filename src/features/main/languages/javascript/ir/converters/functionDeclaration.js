import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const functionDeclarationConverter = {
	toIrs: {
		FunctionDeclaration: (node) => {
			return {
				type: "function_declaration",
				name: node.id.name,
				parameters: node.params.map((p) => p.name),
				content: node.body.body.map(convertAstToIr),
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		function_declaration: (node) => {
			return {
				type: "FunctionDeclaration",
				id: {
					type: "Identifier",
					name: node.name,
				},
				params: node.parameters.map((p) => {
					return {
						type: "Identifier",
						name: p,
					};
				}),
				body: {
					type: "BlockStatement",
					body: node.content.map(convertIrToAst),
				},
				id: node.id ?? null
			};
		},
	},
};
