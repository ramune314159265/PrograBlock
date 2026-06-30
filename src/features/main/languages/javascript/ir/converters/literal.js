import { nanoid } from 'nanoid';

export const LiteralConverter = {
	toIrs: {
		Literal: (node) => {
			switch (node.value) {
				case true:
					return {
						type: "true",
						uid: node?.uid ?? nanoid()
					};
				case false:
					return {
						type: "false",
						uid: node?.uid ?? nanoid()
					};
				default:
					return {
						type: typeof node.value,
						content: node.value,
						uid: node?.uid ?? nanoid()
					};
			}
		},
	},
	toJavaScripts: {
		number: (node) => {
			return {
				type: "Literal",
				value: node.content,
				uid: node?.uid ?? null
			};
		},
		string: (node) => {
			return {
				type: "Literal",
				value: node.content,
				uid: node?.uid ?? null
			};
		},
		true: (node) => {
			return {
				type: "Literal",
				value: true,
				uid: node?.uid ?? null
			};
		},
		false: (node) => {
			return {
				type: "Literal",
				value: false,
				uid: node?.uid ?? null
			};
		},
	},
};
