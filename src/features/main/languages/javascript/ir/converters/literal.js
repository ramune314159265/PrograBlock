export const LiteralConverter = {
	toIrs: {
		Literal: (node) => {
			switch (node.value) {
				case true:
					return {
						type: "true",
					};
				case false:
					return {
						type: "false",
					};
				default:
					return {
						type: typeof node.value,
						content: node.value,
					};
			}
		},
	},
	toJavaScripts: {
		number: (node) => {
			return {
				type: "Literal",
				value: node.content,
			};
		},
		string: (node) => {
			return {
				type: "Literal",
				value: node.content,
			};
		},
		true: (node) => {
			return {
				type: "Literal",
				value: true,
			};
		},
		false: (node) => {
			return {
				type: "Literal",
				value: false,
			};
		},
	},
};
