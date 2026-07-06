import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const expressionExpressionConverter = {
	toIrs: {
		expression_expression: (node) => {
			return {
				type: "expression_expression",
				content: convertBlockToIr(node.inputs?.content?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		expression_expression: (node) => {
			return {
				type: "expression_expression",
				id: node.uid,
				inputs: {
					content: {
						block: convertIrToBlock(node.cotent),
					},
				},
			};
		},
	},
};
