import { GiCat } from "react-icons/gi";
import { IoLogoJavascript } from "react-icons/io";
import { Block } from "./panels/block/components/Block";
import { JavaScript } from "./panels/javascript/components/JavaScript";
import { Output } from './panels/output/components/Output';

export const panels = {
	javascript: {
		id: 'javascript',
		name: 'JavaScript',
		component: JavaScript,
		icon: IoLogoJavascript
	},
	block: {
		id: 'block',
		name: 'ブロック',
		component: Block,
		icon: GiCat
	},
	output: {
		id:'output',
		name: '出力',
		component: Output,
	}
}
