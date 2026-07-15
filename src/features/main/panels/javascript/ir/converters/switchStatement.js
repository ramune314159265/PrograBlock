import { nanoid } from 'nanoid';
import { convertAstsToIr, convertAstToIr, convertIrToAst } from "..";

export const switchStatementConverter = {
	toIrs: {
		SwitchStatement: (node) => {
			return {
				type: "switch_statement",
				discriminant: convertAstToIr(node.discriminant),
				cases: convertAstsToIr(node.cases),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		switch_statement: (node) => {
			return {
				type: "SwitchStatement",
				discriminant: convertIrToAst(node.discriminant),
				cases: node.cases.map(convertIrToAst),
				uid: node?.uid ?? null
			};
		},
	},
};
