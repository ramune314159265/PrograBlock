import { convertIrToAst } from "..";

export const emptyConverter = {
	toIrs: {},
	toJavaScripts: {
		empty: (node) => {
			return convertIrToAst(node.placeholder);
		},
	},
};
