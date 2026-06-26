import { convertAstToIr, convertIrToAst } from "..";

export const returnStatementConverter = {
	toIrs: {
		ReturnStatement: (node) => {
			return {
				type: "return_statement",
				content: convertAstToIr(node.argument),
			};
		},
	},
	toJavaScripts: {
		return_statement: (node) => {
			return {
				type: "ReturnStatement",
				argument: convertIrToAst(node.content),
			};
		},
	},
};
