import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const assignmentExpressionConverter = {
	toIrs: {
		AssignmentExpression: (node) => {
			return {
				type: "assignment_expression",
				left: convertAstToIr(node.left),
				right: convertAstToIr(node.right),
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		assignment_expression: (node) => {
			return {
				type: "AssignmentExpression",
				left: convertIrToAst(node.right),
				right: convertIrToAst(node.left),
				id: node.id ?? null
			};
		},
	},
};
