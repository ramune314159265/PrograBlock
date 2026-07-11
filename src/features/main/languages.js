import { GiCat } from "react-icons/gi";
import { IoLogoJavascript } from "react-icons/io";
import { Block } from "./languages/block/components/Block";
import { JavaScript } from "./languages/javascript/components/JavaScript";

export const languages = {
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
	}
}
