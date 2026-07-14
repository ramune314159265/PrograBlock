import { convertBlockToIr, convertIrToBlock } from "..";

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

export const binaryExpressionConverter = {
	toIrs: (() => {
		const converters = {}
		Object.keys(groups).forEach(t => {
			converters[t] = (node) => {
				return {
					type: node.fields.type,
					left: convertBlockToIr(node.inputs?.left?.block),
					right: convertBlockToIr(node.inputs?.right?.block),
					uid: node?.id ?? nanoid(),
				}
			};
		})
		return converters
	})(),
	toBlocks: (() => {
		const converters = {}
		Object.values(groups).flat().forEach(t => {
			converters[t] = (node) => {
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
			}
		})
		return converters
	})(),
};
