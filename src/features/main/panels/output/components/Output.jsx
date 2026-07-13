import { Box, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import { WebContainer } from "@webcontainer/api";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { HiPlay } from "react-icons/hi2";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { processAtom } from "../../../states/runtime";
import { javascriptContentAtom } from "../../../states/editor";

export const Output = () => {
	const [process, setProcess] = useAtom(processAtom)
	const [javaScriptContent, setJavaScriptContent] = useAtom(javascriptContentAtom)

	const containerRef = useRef(null);
	const termRef = useRef();
	const webContainerRef = useRef(null);
	const filesRef = useRef(null);
	useEffect(() => {
		if (!containerRef.current || termRef.current) {
			return;
		}

		termRef.current = new Terminal();
		const fitAddon = new FitAddon();
		termRef.current.loadAddon(fitAddon);
		termRef.current.open(containerRef.current);
		const resizeObserver = new ResizeObserver(() => {
			fitAddon.fit();
		});
		resizeObserver.observe(containerRef.current);
	});
	useEffect(() => {
		if (webContainerRef.current || !termRef.current) {
			return;
		}
		webContainerRef.current = 1;

		(async () => {
			webContainerRef.current = await WebContainer.boot();
			filesRef.current = {
				"index.js": {
					file: {
						contents: 'console.log("123")',
					},
				},
			};
			webContainerRef.current.mount(filesRef.current);
			const process = await webContainerRef.current.spawn("node", [
				"index.js",
			]);
			process.output.pipeTo(
				new WritableStream({
					write(data) {
						termRef.current.write(data);
					},
				}),
			);
		})();
	});

	const run = async (content) => {
		console.log(webContainerRef.current)
		webContainerRef.current.fs.writeFile('index.js',content)
		const process = await webContainerRef.current.spawn("node", [
			"index.js",
		]);
		process.output.pipeTo(
			new WritableStream({
				write(data) {
					termRef.current.write(data);
				},
			}),
		);
	}

	return (
		<SimpleGrid
			gridTemplateColumns={"2.5rem calc(100% - 2.5rem)"}
			width="full"
			height="full"
			overflow="hidden"
		>
			<HStack
				width="full"
				height="full"
				justifyContent="center"
				alignItems="flex-start"
			>
				<IconButton size="sm" variant="ghost" onClick={() => run(javaScriptContent)}>
					<HiPlay />
				</IconButton>
			</HStack>
			<Box
				ref={containerRef}
				width="full"
				height="full"
				overflow="hidden"
			></Box>
		</SimpleGrid>
	);
};
