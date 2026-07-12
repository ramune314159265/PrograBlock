import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const callExpressionConverter = {
	toIrs: {
		call_expression: (node) => {
			return {
				type: "call_expression",
				function: convertBlockToIr(node.inputs?.function?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		call_expression: (node) => {
			return {
				type: "call_expression",
				id: node.uid,
				inputs: {
					function: {
						block: convertIrToBlock(node.function),
					},
				},
			};
		},
	},
};
