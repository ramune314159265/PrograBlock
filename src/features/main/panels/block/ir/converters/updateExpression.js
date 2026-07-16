import { convertBlockToIr, convertIrToBlock, filterInputs } from "..";

const groups = {
	update_expression: ["increment", "decrement"],
};

export const updateExpressionConverter = {
	toIrs: (() => {
		const converters = {}
		Object.keys(groups).forEach(t => {
			converters[t] = (node) => {
				return {
					type: node.fields.type,
					content: convertBlockToIr(node.inputs?.content?.block),
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
					inputs: filterInputs({
						content: {
							block: convertIrToBlock(node.content),
						},
					}),
				};
			}
		})
		return converters
	})(),
};
