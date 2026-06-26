export const breakStatementConverter = {
	toIrs: {
		BreakStatement: (node) => {
			return {
				type: "break_statement",
			};
		},
	},
	toJavaScripts: {
		break_statement: (node) => {
			return {
				type: "BreakStatement",
			};
		},
	},
};
