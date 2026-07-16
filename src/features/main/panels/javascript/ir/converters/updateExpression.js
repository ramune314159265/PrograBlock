import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

const types = {
	"++": "increment",
	"--": "decrement",
};

export const updateExpressionConverter = {
	toIrs: {
		UpdateExpression: (node) => {
			const type = types?.[node.operator];

			return {
				type: type,
				content: convertAstToIr(node.argument),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: Object.fromEntries(
		Object.entries(types).map(([k, v]) => [
			v,
			(node) => {
				return {
					type: "UpdateExpression",
					operator: k,
					prefix: false,
					argument: convertIrToAst(node.content),
					uid: node?.uid ?? null
				};
			},
		]),
	),
};
