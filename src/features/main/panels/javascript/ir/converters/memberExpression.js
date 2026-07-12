import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

export const memberExpressionConverter = {
	toIrs: {
		MemberExpression: (node) => {
			return {
				type: "member_expression",
				object: convertAstToIr(node.object),
				property: node.property.name,
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		member_expression: (node) => {
			return {
				type: "MemberExpression",
				object: convertIrToAst(node.object),
				property: {
					type: "Identifier",
					name: node.name,
				},
				uid: node?.uid ?? null
			};
		},
	},
};
