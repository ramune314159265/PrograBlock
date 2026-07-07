import { nanoid } from "nanoid";
import {
	convertBlockChainToIr,
	convertBlockToIr,
	convertIrToBlock,
	convertIrToBlockChain,
} from "..";

export const switchStatementConverter = {
	toIrs: {
		switch_statement: (node) => {
			return {
				type: "switch_statement",
				discriminant: convertBlockToIr(
					node.inputs?.discriminant?.block,
				),
				cases: convertBlockChainToIr(node.inputs?.cases?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		switch_statement: (node) => {
			return {
				type: "switch_statement",
				id: node.uid,
				fields: {
					discriminant: {
						block: convertIrToBlock(node.discriminant),
					},
					cases: {
						block: convertIrToBlockChain(node.casesva),
					},
				},
			};
		},
	},
};
