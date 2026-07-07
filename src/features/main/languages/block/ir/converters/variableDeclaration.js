import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const variableDeclarationConverter = {
	toIrs: {
		variable_declaration: (node) => {
			return {
				type: "variable_declaration",
				variableType: node.inputs.variableType,
				name: convertBlockToIr(node.inputs?.name),
				value: convertBlockToIr(node.inputs?.value?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		variable_declaration: (node) => {
			return {
				type: "variable_declaration",
				id: node.uid,
				inputs: {
					left: {
						block: convertIrToBlock(node.left),
					},
					right: {
						block: convertIrToBlock(node.right),
					},
				},
			};
		},
	},
};
