export const identifierConverter = {
	toIrs: {
		Identifier: (node) => {
			if (node.name === "undefined") {
				return {
					type: "undefined",
				};
			}
			return {
				type: "identifier",
				name: node.name,
			};
		},
	},
	toJavaScripts: {
		identifier: (node) => {
			return {
				type: "Identifier",
				name: node.name,
			};
		},
		undefined: (node) => {
			return {
				type: "Identifier",
				name: "undefined",
			};
		},
	},
};
