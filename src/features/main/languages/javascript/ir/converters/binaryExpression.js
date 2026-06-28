import { nanoid } from 'nanoid';
import { convertAstToIr, convertIrToAst } from "..";

const types = {
	"===": "equal",
	"!==": "not_equal",
	">": "greater_than",
	">=": "greater_than_or_equal",
	"<": "less_than",
	"<=": "less_than_or_equal",
	"%": "remainder",
	"+": "addition",
	"-": "subtraction",
	"*": "multiplication",
	"/": "division",
	"**": "exponentiation",
	"&&": "logical_and",
	"||": "logical_or",
	"??": "nullish_coalescing",
};

export const binaryExpressionConverter = {
	toIrs: {
		BinaryExpression: (node) => {
			const type = types?.[node.operator];

			return {
				type: type,
				left: convertAstToIr(node.left),
				right: convertAstToIr(node.right),
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: Object.fromEntries(
		Object.entries(types).map(([k, v]) => [
			v,
			(node) => {
				return {
					type: "BinaryExpression",
					operator: k,
					left: convertIrToAst(node.left),
					right: convertIrToAst(node.right),
					id: node.id ?? null
				};
			},
		]),
	),
};
