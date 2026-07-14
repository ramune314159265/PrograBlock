import { nanoid } from "nanoid";

export const identifierConverter = {
	toIrs: {
		identifier: (node) => {
			return {
				type: "identifier",
				name: node.fields?.name,
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
					name: node.name,
				},
			};
		},
	},
};
