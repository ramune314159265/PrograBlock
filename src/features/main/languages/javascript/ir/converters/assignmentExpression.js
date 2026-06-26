import { convertAstToIr, convertIrToAst } from "..";

export const assignmentExpressionConverter = {
	toIrs: {
		AssignmentExpression: (node) => {
			return {
				type: "assignment_expression",
				left: convertAstToIr(node.left),
				right: convertAstToIr(node.right),
			};
		},
	},
	toJavaScripts: {
		assignment_expression: (node) => {
			return {
				type: "AssignmentExpression",
				left: convertIrToAst(node.right),
				right: convertIrToAst(node.left),
			};
		},
	},
};
