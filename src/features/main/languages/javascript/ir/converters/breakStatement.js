import { nanoid } from 'nanoid';

export const breakStatementConverter = {
	toIrs: {
		BreakStatement: (node) => {
			return {
				type: "break_statement",
				id: node.id ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		break_statement: (node) => {
			return {
				type: "BreakStatement",
				id: node.id ?? null
			};
		},
	},
};
