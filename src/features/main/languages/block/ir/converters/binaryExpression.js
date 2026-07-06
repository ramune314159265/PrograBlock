import { convertIrToBlock } from "..";

/*
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
*/

const groups = {
	equal_expression: ["equal", "not_equal"],
	comparison_expression: [
		"greater_than",
		"greater_than_or_equal",
		"less_than",
		"less_than_or_equal",
	],
	arithmetic_expression: [
		"remainder",
		"addition",
		"subtraction",
		"multiplication",
		"division",
		"exponentiation",
	],
};

export const assignmentExpressionConverter = {
	toIrs: {
		binary_expression: (node) => {
			return {
				type: node.fields.type,
				left: convertBlockToIr(node.inputs?.left?.block),
				right: convertBlockToIr(node.inputs?.right?.block),
				uid: node?.id ?? nanoid(),
			};
		},
	},
	toBlocks: {
		binary_expression: (node) => {
			const type = Object.entries(groups).find(([k, v]) =>
				v.includes(node.type),
			)[0];
			return {
				type: type,
				id: node.uid,
				fields: {
					type: node.type,
				},
				inputs: {
					left: {
						block: convertIrToBlock(node.left),
					},
					right: {
						block: convertIrToBlock(node.right),
					},
				},
			};
		},
	},
};
