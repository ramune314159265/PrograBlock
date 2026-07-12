import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const assignmentExpressionConverter = {
	toIrs: {
		AssignmentExpression: (node) => {
			return {
				type: "assignment_expression",
				left: convertAstToIr(node.left),
				right: convertAstToIr(node.right),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		assignment_expression: (node) => {
			return {
				type: "AssignmentExpression",
				operator: "=",
				left: convertIrToAst(node.left),
				right: convertIrToAst(node.right),
				uid: node?.uid ?? null
			};
		},
	},
};
