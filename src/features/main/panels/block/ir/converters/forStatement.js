import { nanoid } from "nanoid";
import { convertBlockChainToIr, convertBlockToIr, convertIrToBlock, convertIrToBlockChain, filterInputs } from "..";

export const forStatementConverter = {
	toIrs: {
		for_statement: (node) => {
			return {
				type: "for_statement",
				variable: node.fields?.variable,
				init: convertBlockToIr(node.inputs?.init?.block),
				condition: convertBlockToIr(node.inputs?.condition?.block),
				update: convertBlockToIr(node.inputs?.update?.block),
				content: convertBlockChainToIr(node.inputs?.content?.block),
				uid: node?.uid ?? nanoid(),
			};
		},
	},
	toBlocks: {
		for_statement: (node) => {
			return {
				type: "for_statement",
				id: node.uid,
				fields: {
					variable: node.variable
				},
				inputs: filterInputs({
					init: {
						block: convertIrToBlock(node.init),
					},
					condition: {
						block: convertIrToBlock(node.condition),
					},
					update: {
						block: convertIrToBlock(node.update),
					},
					content: {
						block: convertIrToBlockChain(node.content),
					}
				}),
			};
		},
	},
};
