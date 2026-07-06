import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const blockStatementConverter = {
	toIrs: {
		block_statement: (node) => {
			return {
				type: "block_statement",
			};
		},
	},
	toBlocks: {
		block_statement: (node) => {
			return {
				type: "block_statement",
			};
		},
	},
};
