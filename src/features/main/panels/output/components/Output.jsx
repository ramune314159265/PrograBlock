import { Tooltip } from '@/components/ui/tooltip';
import { Box, IconButton, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { WebContainer } from "@webcontainer/api";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { HiNoSymbol, HiPlay, HiStop } from "react-icons/hi2";
import { javascriptContentAtom } from "../../../states/editor";
import { processAtom } from "../../../states/runtime";

let webContainerCache

const getWebContainer = async () => {
	if (!webContainerCache) {
		webContainerCache = WebContainer.boot()
	}

	return webContainerCache
}

export const Output = () => {
	const [process, setProcess] = useAtom(processAtom)
	const [javaScriptContent, setJavaScriptContent] = useAtom(javascriptContentAtom)

	const containerRef = useRef(null);
	const termRef = useRef(null);
	const webContainerRef = useRef(null);
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
			webContainerRef.current = await getWebContainer();
			const files = {
				"index.js": {
					file: {
						contents: '',
					},
				},
			};
			webContainerRef.current.mount(files);
		})();
	});

	const clear = () => {
		if (!termRef.current) {
			return
		}
		termRef.current.clear()
	}
	const run = async (content) => {
		if (process) {
			return
		}
		webContainerRef.current.fs.writeFile('index.js', content)
		const p = await webContainerRef.current.spawn("node", [
			"index.js",
		]);
		clear()
		p.output.pipeTo(
			new WritableStream({
				write(data) {
					termRef.current.write(data);
				},
			}),
		);
		setProcess(p)
		await p.exit
		setProcess(null)
	}
	const stop = () => {
		console.log(process)
		if (!process) {
			return
		}
		process.kill()
	}

	return (
		<SimpleGrid
			gridTemplateColumns={"2.5rem calc(100% - 2.5rem)"}
			width="full"
			height="full"
			overflow="hidden"
		>
			<VStack
				width="full"
				height="full"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Tooltip showArrow content={process ? '実行中...' : '実行する'} positioning={{ placement: "right-center" }}>
					<IconButton size="sm" variant="ghost" onClick={() => run(javaScriptContent)} disabled={process}>
						{process ? <Spinner /> : <HiPlay />}
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content={'停止する'} positioning={{ placement: "right-center" }}>
					<IconButton size="sm" variant="ghost" onClick={() => stop()} disabled={!process}>
						<HiStop />
					</IconButton>
				</Tooltip>
				<Tooltip showArrow content={'コンソールをクリアする'} positioning={{ placement: "right-center" }}>
					<IconButton size="sm" variant="ghost" onClick={() => clear()}>
						<HiNoSymbol />
					</IconButton>
				</Tooltip>
			</VStack>
			<Box
				ref={containerRef}
				width="full"
				height="full"
				overflow="hidden"
			></Box>
		</SimpleGrid>
	);
};
