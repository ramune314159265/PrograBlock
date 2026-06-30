import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const conditionalExpressionConverter = {
	toIrs: {
		ConditionalExpression: (node) => {
			return {
				type: "conditional_expression",
				condition: convertAstToIr(node.test),
				content: convertAstToIr(node.consequent),
				alternative: convertAstToIr(node.alternate),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		conditional_expression: (node) => {
			return {
				type: "ConditionalExpression",
				test: convertIrToAst(node.condition),
				consequent: convertIrToAst(node.content),
				alternate: convertIrToAst(node.alternative),
				uid: node?.uid ?? null
			};
		},
	},
};
