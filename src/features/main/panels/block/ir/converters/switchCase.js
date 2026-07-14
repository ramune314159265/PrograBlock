import { nanoid } from "nanoid";
import {
	convertBlockChainToIr,
	convertBlockToIr,
	convertIrToBlock,
	convertIrToBlockChain,
    filterInputs,
} from "..";

export const switchCaseConverter = {
	toIrs: {
		switch_case: (node) => {
			return {
				type: "switch_case",
				condition: convertBlockToIr(node.inputs?.condition?.block),
				content: convertBlockChainToIr(node.inputs?.content?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		switch_case: (node) => {
			return {
				type: "switch_case",
				id: node.uid,
				fields: filterInputs({
					condition: {
						block: convertIrToBlock(node.condition),
					},
					content: {
						block: convertIrToBlockChain(node.content),
					},
				}),
			};
		},
	},
};
