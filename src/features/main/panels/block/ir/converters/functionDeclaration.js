import { nanoid } from "nanoid";
import { convertBlockChainToIr, convertIrToBlockChain } from "..";

export const functionDeclarationConverter = {
	toIrs: {
		function_declaration: (node) => {
			return {
				type: "function_declaration",
				name: node.fields?.name,
				parameters: [],
				content: convertBlockChainToIr(node.inputs?.content.block),
				uid: node?.uid ?? nanoid(),
			};
		},
	},
	toBlocks: {
		function_declaration: (node) => {
			return {
				type: "function_declaration",
				id: node.uid,
				fields: {
					name: node.name,
				},
				inputs: {
					content: {
						block: convertIrToBlockChain(node.content),
					},
				},
			};
		},
	},
};
