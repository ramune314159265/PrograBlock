import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock, filterInputs } from "..";

export const returnStatementConverter = {
	toIrs: {
		return_statement: (node) => {
			return {
				type: "return_statement",
				content: convertBlockToIr(node.inputs?.content?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		return_statement: (node) => {
			return {
				type: "return_statement",
				id: node.uid,
				inputs: filterInputs({
					content: {
						block: convertIrToBlock(node.content),
					},
				}),
			};
		},
	},
};
