import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Block } from "./languages/block/components/Block";
import { JavaScript } from "./languages/javascript/components/JavaScript";
import { contentAtom } from "./states/content";
import { languages } from "./languages";
import { Layout, Model } from "flexlayout-react";
import 'flexlayout-react/style/alpha_light.css';

const json = {
	global: {},
	borders: [],
	layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "JavaScript",
                        component: "javascript",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "ブロック",
                        component: "block",
                    }
                ]
            }
		]
	}
}

const model = Model.fromJson(json);

export const MainPage = () => {
	const [content, setContent] = useAtom(contentAtom);
	const factory = (node) => {
		const id = node.getComponent()
		const data = languages[id]
		if (!data?.component) {
			return <div>不明なコンポーネント</div>
		}

		return <data.component ir={content} setIr={setContent}></data.component>
	}

	return (
		<Layout
			model={model}
			factory={factory}
		></Layout>
	);
};
