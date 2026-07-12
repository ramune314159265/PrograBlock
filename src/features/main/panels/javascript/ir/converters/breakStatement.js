import { nanoid } from 'nanoid';

export const breakStatementConverter = {
	toIrs: {
		BreakStatement: (node) => {
			return {
				type: "break_statement",
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		break_statement: (node) => {
			return {
				type: "BreakStatement",
				uid: node?.uid ?? null
			};
		},
	},
};
