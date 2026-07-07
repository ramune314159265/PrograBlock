import { nanoid } from "nanoid";
import { convertBlockToIr, convertIrToBlock } from "..";

export const literalConverter = {
	toIrs: {
		number: (node) => {
			return {
				type: "number",
				value: node.inputs?.content,
				uid: node?.uid ?? nanoid(),
			};
		},
		string: (node) => {
			return {
				type: "string",
				value: node.inputs?.content,
				uid: node?.uid ?? nanoid(),
			};
		},
		true: (node) => {
			return {
				type: "true",
				uid: node?.uid ?? nanoid(),
			};
		},
		false: (node) => {
			return {
				type: "false",
				uid: node?.uid ?? nanoid(),
			};
		},
	},
	toBlocks: {
		number: (node) => {
			return {
				type: "number",
				id: node?.uid ?? nanoid(),
				inputs: {
					content: node.content,
				},
			};
		},
		string: (node) => {
			return {
				type: "string",
				id: node?.uid ?? nanoid(),
				inputs: {
					content: node.content,
				},
			};
		},
		true: (node) => {
			return {
				type: "true",
				id: node?.uid ?? nanoid(),
			};
		},
		false: (node) => {
			return {
				type: "false",
				id: node?.uid ?? nanoid(),
			};
		},
	},
};
