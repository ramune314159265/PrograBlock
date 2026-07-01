import { Box } from '@chakra-ui/react';
import * as Blockly from 'blockly/core';
import * as Ja from 'blockly/msg/ja';
import { useEffect, useRef } from 'react';

Blockly.common.defineBlocksWithJsonArray([
	{
		"type": "variable_declaration",
		"tooltip": "変数、定数の定義をします",
		"helpUrl": "",
		"message0": "変数 %1 に %2 を代入 %3",
		"args0": [
			{
				"type": "field_input",
				"name": "NAME",
				"text": "name"
			},
			{
				"type": "input_value",
				"name": "init"
			},
			{
				"type": "input_dummy",
				"name": "NAME"
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 225
	}
]);

const toolbox = {
	kind: 'flyoutToolbox',
	contents: [
		{
			kind: 'block',
			type: 'variable_declaration'
		}
	]
}

export const Block = ({ ir, setIr }) => {
	const containerRef = useRef()
	const initializedRef = useRef(false)
	useEffect(() => {
		if (!containerRef.current || initializedRef.current) {
			return
		}

		initializedRef.current = true
		Blockly.setLocale(Ja)
		const workspace = Blockly.inject(containerRef.current, {
			toolbox,
			move: {
				scrollbars: {
					horizontal: true,
					vertical: true,
				},
				drag: true,
				wheel: false,
			},
			renderer: 'Zelos'
		})

		workspace.addChangeListener(() => {
			// if (event.isUiEvent) return
			const json = Blockly.serialization.workspaces.save(workspace)
			console.log(json)
		})
	}, [containerRef])

	return (
		<Box
			ref={containerRef}
			width="full"
			height="full"
		>

		</Box>
	)
};
