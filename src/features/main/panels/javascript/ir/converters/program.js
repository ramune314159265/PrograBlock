import { convertAstToIr } from "..";

export const programConverter = {
	toIrs: {
		Program: (node) => {
			return node?.body?.map?.(convertAstToIr) ?? [];
		},
	},
	toJavaScripts: {},
};
