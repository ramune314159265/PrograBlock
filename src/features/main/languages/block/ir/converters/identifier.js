import { nanoid } from "nanoid";
import { convertBlockToIr } from "..";

export const identifierConverter = {
	toIrs: {
		identifier: (node) => {
			return {
				type: "identifier",
				name: convertBlockToIr(node.inputs?.name),
				uid: node?.uid ?? nanoid(),
			};
		},
		undefined: (node) => {
			return {
				type: "undefined",
				uid: node?.uid ?? nanoid(),
			};
		},
	},
	toBlocks: {
		identifier: (node) => {
			return {
				type: "identifier",
				id: node.uid,
				fields: {
					left: node.name,
				},
			};
		},
	},
};
