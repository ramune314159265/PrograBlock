import { nanoid } from 'nanoid';

export const identifierConverter = {
	toIrs: {
		Identifier: (node) => {
			if (node.name === "undefined") {
				return {
					type: "undefined",
					id: node.id ?? nanoid()
				};
			}
			return {
				type: "identifier",
				name: node.name,
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		identifier: (node) => {
			return {
				type: "Identifier",
				name: node.name,
				id: node.id ?? null
			};
		},
		undefined: (node) => {
			return {
				type: "Identifier",
				name: "undefined",
				id: node.id ?? null
			};
		},
	},
};
