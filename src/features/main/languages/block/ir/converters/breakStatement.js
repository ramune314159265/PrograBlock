import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const assignmentExpressionConverter = {
	toIrs: {
		break_statement: (node) => {
			return {
				type: "break_statement",
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		break_statement: (node) => {
			return {
				type: "break_statement",
				id: node.uid,
			};
		},
	},
};
