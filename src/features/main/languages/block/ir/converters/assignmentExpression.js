import { nanoid } from 'nanoid';
import { convertBlockToIr, convertIrToBlock } from '..';

export const assignmentExpressionConverter = {
	toIrs: {
		assignment_expression: (node) => {
			return {
				type: "assignment_expression",
				left: convertBlockToIr(node.inputs?.left?.block),
				right: convertBlockToIr(node.inputs?.right?.block),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toBlocks: {
		assignment_expression: (node) => {
			return {
				type: "assignment_expression",
				id: node.uid,
				inputs: {
					left: {
						block: convertIrToBlock(node.left)
					},
					right: {
						block: convertIrToBlock(node.right)
					}
				}
			};
		},
	},
};
