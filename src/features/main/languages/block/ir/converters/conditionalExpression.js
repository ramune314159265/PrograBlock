import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const conditionalExpressionConverter = {
	toIrs: {
		conditional_expression: (node) => {
			return {
				type: "conditional_expression",
				condition: convertBlockToIr(node.inputs?.condition?.block),
				content: convertBlockToIr(node.inputs?.content?.block),
				alternative: convertBlockToIr(node.inputs?.alternative?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		conditional_expression: (node) => {
			return {
				type: "conditional_expression",
				id: node.uid,
				inputs: {
					condition: {
						block: convertIrToBlock(node.condition),
					},
					content: {
						block: convertIrToBlock(node.cotent),
					},
					alternative: {
						block: convertIrToBlock(node.alternative),
					},
				},
			};
		},
	},
};
