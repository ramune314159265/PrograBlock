import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock, filterInputs } from "..";

export const variableDeclarationConverter = {
	toIrs: {
		variable_declaration: (node) => {
			return {
				type: "variable_declaration",
				variableType: node.fields?.variableType,
				name: node.fields?.name,
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
				fields: {
					variableType: node.variableType,
					name: node.name,
				},
				inputs:  filterInputs({
					value: {
						block: convertIrToBlock(node.value),
					},
				}),
			};
		},
	},
};
