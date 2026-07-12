import { Box } from "@chakra-ui/react";
import { Layout, Model } from "flexlayout-react";
import { panels } from "./panels";
import './styles/flex_layout.css';

const json = {
    global: {
        tabEnableClose: false,
        splitterEnableHandle: true,
        rootOrientationVertical: true,
    },
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "row",
                weight: 70,
                children: [
                    {
                        type: "tabset",
                        weight: 40,
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
                        weight: 60,
                        children: [
                            {
                                type: "tab",
                                name: "ブロック",
                                component: "block",
                            }
                        ]
                    }
                ]
            },
            {
                type: "tabset",
                weight: 30,
                children: [
                    {
                        type: "tab",
                        name: "出力",
                        component: "output",
                    }
                ]
            }
        ]
    }
}

const model = Model.fromJson(json);

export const MainPage = () => {
    const factory = (node) => {
        const id = node.getComponent()
        const data = panels[id]
        if (!data?.component) {
            return <div>不明なコンポーネント</div>
        }

        return <data.component></data.component>
    }
    const renderTabHandle = (node, renderValues) => {
        const id = node.getComponent()
        const data = panels[id]
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
