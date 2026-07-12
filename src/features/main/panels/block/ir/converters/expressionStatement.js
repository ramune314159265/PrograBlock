import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const expressionStatementConverter = {
	toIrs: {
		expression_statement: (node) => {
			return {
				type: "expression_statement",
				content: convertBlockToIr(node.inputs?.content?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		expression_statement: (node) => {
			return {
				type: "expression_statement",
				id: node.uid,
				inputs: {
					content: {
						block: convertIrToBlock(node.content),
					},
				},
			};
		},
	},
};
