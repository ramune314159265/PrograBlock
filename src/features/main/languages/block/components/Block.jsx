import { Box } from "@chakra-ui/react";
import * as ScratchBlocks from "scratch-blocks";
// import * as Ja from "blockly/msg/ja";
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from "react";
import { settingAtom } from '../../../../../state/settingAtom';
import { blocks, toolboxContents } from '../data/blocks';
import { colorModes } from '../data/colorModes';
import { convertBlocklyToIr } from "../ir";

ScratchBlocks.common.defineBlocksWithJsonArray(blocks);
const toolbox = {
	kind: 'categoryToolbox',
	contents: toolboxContents
}
console.log(toolbox)

export const Block = ({ ir, setIr }) => {
	const themeModeAtom = settingAtom('theme_mode')
	const themeMode = useAtomValue(themeModeAtom)

	const containerRef = useRef();
	const workspaceRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current || workspaceRef.current) {
			return;
		}

		const workspace = ScratchBlocks.inject(containerRef.current, {
			toolbox,
			zoom: {
				controls: true,
				wheel: true,
				pinch: true,
				startScale: 1
			},
			move: {
				wheel: true,
			},
			grid: {
				spacing: 40,
				length: 2,
				colour: '#ddd'
			},
			comments: true,
			collapse: false,
			sounds: false,
			trashcan: false,
			modalInputs: false,
			media: '/scratch/blocks-media/',
			theme: new ScratchBlocks.Theme('default', colorModes.default),
			scratchTheme: ScratchBlocks.ScratchBlocksTheme.CAT_BLOCKS
		});
		workspaceRef.current = workspace

		const events = [ScratchBlocks.Events.BLOCK_CHANGE, ScratchBlocks.Events.BLOCK_MOVE];
		workspace.addChangeListener((e) => {
			if (!events.includes(e.type)) {
				return;
			}
			const json = ScratchBlocks.serialization.workspaces.save(workspace);
			console.log("blockly", json);
			const ir = convertBlocklyToIr(json);
			if (!ir) {
				return;
			}
			console.log("ir", ir);
			setIr(ir);
		});

		const resizeObserver = new ResizeObserver(() => {
			ScratchBlocks.svgResize(workspace)
		})
		resizeObserver.observe(containerRef.current)
	}, [containerRef]);

	useEffect(() => {
		if (!workspaceRef.current) {
			return
		}
		const mode = themeMode === 'system'
			? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			: themeMode
		const themeId = mode === 'light' ? 'default' : 'dark'
		workspaceRef.current.setTheme(new ScratchBlocks.Theme(themeId, colorModes[themeId]))
	}, [themeMode])

	return (
		<Box
			ref={containerRef}
			width="full"
			height="full"
			overflow='hidden'
		></Box>
	);
};
