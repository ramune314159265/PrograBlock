import { convertAstToIr, convertIrToAst } from "..";

export const switchStatementConverter = {
	toIrs: {
		SwitchStatement: (node) => {
			return {
				type: "switch_statement",
				discriminant: convertAstToIr(node.discriminant),
				cases: node.cases.map(convertAstToIr),
			};
		},
	},
	toJavaScripts: {
		switch_statement: (node) => {
			return {
				type: "SwitchStatement",
				discriminant: convertIrToAst(node.discriminant),
				cases: node.cases.map(convertIrToAst),
			};
		},
	},
};
