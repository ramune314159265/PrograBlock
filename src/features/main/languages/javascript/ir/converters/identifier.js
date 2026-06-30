import { nanoid } from 'nanoid';

export const identifierConverter = {
	toIrs: {
		Identifier: (node) => {
			if (node.name === "undefined") {
				return {
					type: "undefined",
					uid: node?.uid ?? nanoid()
				};
			}
			return {
				type: "identifier",
				name: node.name,
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		identifier: (node) => {
			return {
				type: "Identifier",
				name: node.name,
				uid: node?.uid ?? null
			};
		},
		undefined: (node) => {
			return {
				type: "Identifier",
				name: "undefined",
				uid: node?.uid ?? null
			};
		},
	},
};
