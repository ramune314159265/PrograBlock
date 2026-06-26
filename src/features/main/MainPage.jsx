import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Block } from "./languages/block/components/Block";
import { JavaScript } from "./languages/javascript/components/JavaScript";
import { contentAtom } from "./states/content";

export const MainPage = () => {
	const [content, setContent] = useAtom(contentAtom);

	return (
		<SimpleGrid width="full" height="full" columns={[2]} overflowY="hidden">
			<Box height="full" overflow="hidden">
				<JavaScript ir={content} setIr={setContent}></JavaScript>
			</Box>
			<Box height="full" overflow="auto">
				<Block ir={content} setIr={setContent}></Block>
			</Box>
		</SimpleGrid>
	);
};
