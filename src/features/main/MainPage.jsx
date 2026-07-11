import { Box } from "@chakra-ui/react";
import { Layout, Model } from "flexlayout-react";
import { useAtom } from "jotai";
import { languages } from "./languages";
import { contentAtom } from "./states/content";
import './styles/flex_layout.css';

const json = {
    global: {
        tabEnableClose: false,
        splitterEnableHandle: true,
    },
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
    const renderTabHandle = (node, renderValues) => {
        const id = node.getComponent()
        const data = languages[id]
        if (!data?.icon) {
            return
        }
        renderValues.leading = <data.icon></data.icon>
    }

    return (
        <Box
            position='relative'
            width='full'
            height='full'
        >
            <Layout
                model={model}
                factory={factory}
                onRenderTab={renderTabHandle}
            ></Layout>
        </Box>
    );
};
