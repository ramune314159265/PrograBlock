import { nanoid } from 'nanoid';
import { convertAstsToIr, convertAstToIr, convertIrToAst } from "..";

export const switchCaseConverter = {
	toIrs: {
		SwitchCase: (node) => {
			return {
				type: "switch_case",
				condition: convertAstToIr(node.test),
				content: convertAstsToIr(node.consequent),
				uid: node?.uid ?? nanoid()
			};
		},
	},
	toJavaScripts: {
		switch_case: (node) => {
			return {
				type: "SwitchCase",
				test: convertIrToAst(node.condition),
				consequent: node.content.map(convertIrToAst),
				uid: node?.uid ?? null
			};
		},
	},
};
