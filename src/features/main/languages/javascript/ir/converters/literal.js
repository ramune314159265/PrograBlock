import { nanoid } from 'nanoid';

export const LiteralConverter = {
	toIrs: {
		Literal: (node) => {
			switch (node.value) {
				case true:
					return {
						type: "true",
						id: node.id ?? nanoid()
					};
				case false:
					return {
						type: "false",
						id: node.id ?? nanoid()
					};
				default:
					return {
						type: typeof node.value,
						content: node.value,
						id: node.id ?? nanoid()
					};
			}
		},
	},
	toJavaScripts: {
		number: (node) => {
			return {
				type: "Literal",
				value: node.content,
				id: node.id ?? null
			};
		},
		string: (node) => {
			return {
				type: "Literal",
				value: node.content,
				id: node.id ?? null
			};
		},
		true: (node) => {
			return {
				type: "Literal",
				value: true,
				id: node.id ?? null
			};
		},
		false: (node) => {
			return {
				type: "Literal",
				value: false,
				id: node.id ?? null
			};
		},
	},
};
