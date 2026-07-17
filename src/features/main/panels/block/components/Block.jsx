import { Box } from "@chakra-ui/react";
import * as ScratchBlocks from "scratch-blocks";
// import * as Ja from "blockly/msg/ja";
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from "react";
import { settingAtom } from '../../../../../state/settingAtom';
import { irAtom } from '../../../states/editor';
import { blocks, toolboxContents } from '../data/blocks';
import { colorModes } from '../data/colorModes';
import { extensions } from '../extensions';
import { convertBlocklyToIr, convertIrToBlockly } from "../ir";

export const Block = () => {
	const [ir, setIr] = useAtom(irAtom)
	const themeModeAtom = settingAtom('theme_mode')
	const themeMode = useAtomValue(themeModeAtom)

	const isFocusedRef = useRef(false);
	const containerRef = useRef(null);
	const workspaceRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current || workspaceRef.current) {
			return;
		}

		Object.entries(extensions).forEach(([name, fn]) => {
			if (ScratchBlocks.Extensions.isRegistered(name)) {
				return
			}
			ScratchBlocks.Extensions.register(name, function () {
				return fn(this)
			})
		})
		ScratchBlocks.common.defineBlocksWithJsonArray(blocks);
		const workspace = ScratchBlocks.inject(containerRef.current, {
			toolbox: {
				kind: 'categoryToolbox',
				contents: toolboxContents
			},
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
			media: './scratch/blocks-media/',
			theme: new ScratchBlocks.Theme('default', colorModes.default),
			scratchTheme: ScratchBlocks.ScratchBlocksTheme.CAT_BLOCKS
		});
		workspaceRef.current = workspace
		ScratchBlocks.serialization.workspaces.load({
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "start"
					}
				]
			}
		}, workspace)

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

	useEffect(() => {
		if (!workspaceRef.current || !ir) {
			return
		}
		if (isFocusedRef.current) {
			return
		}
		const json = convertIrToBlockly(ir)
		console.log('blockly', json)
		ScratchBlocks.serialization.workspaces.load(json, workspaceRef.current)
	}, [ir])
	useEffect(() => {
		if (!containerRef.current) {
			return
		}
		const abortController = new AbortController()
		containerRef.current.addEventListener('focus', () => {
			isFocusedRef.current = true
		}, { signal: abortController.signal, capture: true })
		containerRef.current.addEventListener('blur', () => {
			isFocusedRef.current = false
		}, { signal: abortController.signal, capture: true })
		return () => abortController.abort()
	})

	return (
		<Box
			ref={containerRef}
			width="full"
			height="full"
			overflow='hidden'
		></Box>
	);
};
