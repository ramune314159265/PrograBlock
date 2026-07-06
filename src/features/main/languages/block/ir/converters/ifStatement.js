import { nanoid } from 'nanoid';
import { convertBlockChainToIr, convertBlockToIr, convertIrToBlock } from '..';

export const ifStatementConverter = {
	toIrs: {
		if_statement: (node) => {
			return {
				type: "if_statement",
				condition: convertBlockToIr(node.inputs?.condition?.block),
				content: convertBlockChainToIr(node.inputs?.content?.block),
				alternative: convertBlockChainToIr(node.inputs?.alternative?.block),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toBlocks: {
		if_statement: (node) => {
			return {
				type: "if_statement",
				id: node.uid,
				inputs: {
					condition: {
						block: convertIrToBlock(node.condition),
					},
					content: {
						block: convertBlockChainToIr(node.content),
					},
					alternative: {
						block: convertBlockChainToIr(node.alternative),
					},
				},
			};
		},
	},
};
