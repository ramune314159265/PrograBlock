import { Block } from "./languages/block/components/Block";
import { JavaScript } from "./languages/javascript/components/JavaScript";

export const languages = {
	javascript: {
		id: 'javascript',
		name: 'JavaScript',
		component: JavaScript
	},
	block: {
		id: 'block',
		name: 'ブロック',
		component: Block
	}
}
