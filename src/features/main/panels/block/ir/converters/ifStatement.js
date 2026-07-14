import { nanoid } from "nanoid";
import { convertBlockChainToIr, convertBlockToIr, convertIrToBlock, convertIrToBlockChain, filterInputs } from "..";

export const ifStatementConverter = {
	toIrs: {
		if_statement: (node) => {
			return {
				type: "if_statement",
				condition: convertBlockToIr(node.inputs?.condition?.block),
				content: convertBlockChainToIr(node.inputs?.content?.block),
				alternative: convertBlockChainToIr(node.inputs?.alternative?.block),
				uid: node?.uid ?? nanoid(),
			};
		},
	},
	toBlocks: {
		if_statement: (node) => {
			console.log({
				condition: {
					block: convertIrToBlock(node.condition),
				},
				content: {
					block: convertIrToBlockChain(node.content),
				},
				alternative: {
					block: convertIrToBlockChain(node.alternative),
				},
			},filterInputs({
				condition: {
					block: convertIrToBlock(node.condition),
				},
				content: {
					block: convertIrToBlockChain(node.content),
				},
				alternative: {
					block: convertIrToBlockChain(node.alternative),
				},
			}))
			return {
				type: "if_statement",
				id: node.uid,
				inputs: filterInputs({
					condition: {
						block: convertIrToBlock(node.condition),
					},
					content: {
						block: convertIrToBlockChain(node.content),
					},
					alternative: {
						block: convertIrToBlockChain(node.alternative),
					},
				}),
			};
		},
	},
};
