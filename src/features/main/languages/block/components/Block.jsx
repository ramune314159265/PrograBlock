import { Box } from "@chakra-ui/react";
import * as Blockly from "blockly/core";
import * as Ja from "blockly/msg/ja";
import { useEffect, useRef } from "react";

Blockly.common.defineBlocksWithJsonArray([
	{
		type: "variable_declaration",
		tooltip: "変数、定数の定義をします",
		helpUrl: "",
		message0: "%1 %2 を定義し、 %3 を代入する %4",
		args0: [
			{
				type: "field_dropdown",
				name: "variableType",
				options: [
					["変数", "let"],
					["定数", "const"],
				],
			},
			{
				type: "field_input",
				name: "name",
				text: "name",
			},
			{
				type: "input_value",
				name: "init",
			},
			{
				type: "input_dummy",
				name: "d1",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 225,
	},
	{
		type: "if_statement",
		tooltip: "条件がtrueの場合、中を実行します",
		helpUrl: "",
		message0: "もし %1 なら %2 %3",
		args0: [
			{
				type: "input_value",
				name: "condition",
			},
			{
				type: "input_dummy",
				name: "d1",
			},
			{
				type: "input_statement",
				name: "content",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 225,
	},
	{
		type: "assignment_expression",
		tooltip: "変数に値を代入します (代入後の値を返す)",
		helpUrl: "",
		message0: "%1 に %2 を代入する %3",
		args0: [
			{
				type: "input_value",
				name: "left",
			},
			{
				type: "input_value",
				name: "right",
			},
			{
				type: "input_dummy",
				name: "d1",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "equal_expression",
		tooltip: "2つの値が等しいか判定します",
		helpUrl: "",
		message0: "%1 と %3 が %2 %4",
		args0: [
			{
				type: "input_value",
				name: "left",
			},
			{
				type: "field_dropdown",
				name: "type",
				options: [
					["同じ", "equal"],
					["異なる", "not_equal"],
				],
			},
			{
				type: "input_value",
				name: "type",
			},
			{
				type: "input_end_row",
				name: "right",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "comparison_expression",
		tooltip: "数値の比較をします",
		helpUrl: "",
		message0: "%1 %2 %3 %4",
		args0: [
			{
				type: "input_value",
				name: "left",
			},
			{
				type: "field_dropdown",
				name: "type",
				options: [
					["<", "less_than"],
					["<=", "less_than_or_equal"],
					[">", "greater_than"],
					[">=", "greater_than_or_equal"],
				],
			},
			{
				type: "input_value",
				name: "type",
			},
			{
				type: "input_end_row",
				name: "right",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "arithmetic_expression",
		tooltip: "数値の演算をします",
		helpUrl: "",
		message0: "%1 %2 %3 %4",
		args0: [
			{
				type: "input_value",
				name: "left",
			},
			{
				type: "field_dropdown",
				name: "type",
				options: [
					["+", "addition"],
					["-", "subtraction"],
					["*", "multiplication"],
					["/", "divion"],
					["**", "exponentiation"],
				],
			},
			{
				type: "input_value",
				name: "type",
			},
			{
				type: "input_end_row",
				name: "right",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "break_statement",
		tooltip: "ループ、switchから抜け出します",
		helpUrl: "",
		message0: "処理を終了 %1",
		args0: [
			{
				type: "input_dummy",
				name: "d1",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 225,
	},
	{
		type: "call_expression",
		tooltip: "",
		helpUrl: "",
		message0: "関数 %1 の実行(結果) %2",
		args0: [
			{
				type: "input_value",
				name: "function",
			},
			{
				type: "input_end_row",
				name: "d1",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "conditional_expression",
		tooltip: "三項演算子",
		helpUrl: "",
		message0: "もし %1 が真なら %2 が偽なら %3 %4",
		args0: [
			{
				type: "input_value",
				name: "condition",
			},
			{
				type: "input_value",
				name: "content",
			},
			{
				type: "input_value",
				name: "alternative",
			},
			{
				type: "input_end_row",
				name: "d1",
			},
		],
		output: null,
		colour: 225,
	},
	{
		type: "expression_statement",
		tooltip: "",
		helpUrl: "",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "content",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 225,
	},
	{
		type: "function_declaration",
		tooltip: "関数を定義します",
		helpUrl: "",
		message0: "関数 %1 %2 を定義する %3  %4",
		args0: [
			{
				type: "field_input",
				name: "name",
				text: "func",
			},
			{
				type: "input_dummy",
				name: "d1",
			},
			{
				type: "input_end_row",
				name: "d2",
			},
			{
				type: "input_statement",
				name: "content",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 225,
	},
	{
		type: "identifier",
		tooltip: "変数を参照します",
		helpUrl: "",
		message0: "変数 %1 %2",
		args0: [
			{
				type: "field_input",
				name: "name",
				text: "identifier",
			},
			{
				type: "input_dummy",
				name: "name",
			},
		],
		output: null,
		colour: 225,
	},
	{
		"type": "number",
		"tooltip": "number",
		"helpUrl": "",
		"message0": "数値 %1 %2",
		"args0": [
			{
				"type": "field_number",
				"name": "content",
				"value": 0
			},
			{
				"type": "input_dummy",
				"name": "d1"
			}
		],
		"output": null,
		"colour": 225
	},
	{
		"type": "string",
		"tooltip": "string",
		"helpUrl": "",
		"message0": "文字列 %1 %2",
		"args0": [
			{
				"type": "field_input",
				"name": "content",
				"text": ""
			},
			{
				"type": "input_dummy",
				"name": "d1"
			}
		],
		"output": null,
		"colour": 225
	},
	{
		"type": "true",
		"tooltip": "true",
		"helpUrl": "",
		"message0": "真 %1",
		"args0": [
			{
				"type": "input_dummy",
				"name": "d1"
			}
		],
		"output": null,
		"colour": 225
	},
	{
		"type": "false",
		"tooltip": "false",
		"helpUrl": "",
		"message0": "偽 %1",
		"args0": [
			{
				"type": "input_dummy",
				"name": "d1"
			}
		],
		"output": null,
		"colour": 225
	},
	{
		"type": "return_statement",
		"tooltip": "値を指定した場合は値を返し、現在の関数を終了します",
		"helpUrl": "",
		"message0": "値 %1 を返し、関数を終了する %2",
		"args0": [
			{
				"type": "input_value",
				"name": "content"
			},
			{
				"type": "input_end_row",
				"name": "d1"
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 225
	},
	{
		"type": "switch_statement",
		"tooltip": "値がそれぞれの場合に当てはまるかどうかで分岐します",
		"helpUrl": "",
		"message0": "%1 が %2 %3",
		"args0": [
			{
				"type": "input_value",
				"name": "discriminant"
			},
			{
				"type": "input_dummy",
				"name": "d1"
			},
			{
				"type": "input_statement",
				"name": "NAME",
				"check": "switch_case"
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 225
	},
	{
		"type": "switch_case",
		"tooltip": "",
		"helpUrl": "",
		"message0": "%1 の場合 %2 %3",
		"args0": [
			{
				"type": "input_value",
				"name": "condition"
			},
			{
				"type": "input_dummy",
				"name": "d1"
			},
			{
				"type": "input_statement",
				"name": "content"
			}
		],
		"previousStatement": null,
		"nextStatement": "switch_case",
		"colour": 225
	}
]);

const toolbox = {
	kind: "flyoutToolbox",
	contents: [
		{
			kind: "block",
			type: "variable_declaration",
		},
		{
			kind: "block",
			type: "if_statement",
		},
		{
			kind: "block",
			type: "assignment_expression",
		},
		{
			kind: "block",
			type: "comparison_expression",
		},
		{
			kind: "block",
			type: "equal_expression",
		},
		{
			kind: "block",
			type: "arithmetic_expression",
		},
		{
			kind: "block",
			type: "break_statement",
		},
		{
			kind: "block",
			type: "call_expression",
		},
		{
			kind: "block",
			type: "conditional_expression",
		},
		{
			kind: "block",
			type: "expression_statement",
		},
		{
			kind: "block",
			type: "function_declaration",
		},
		{
			kind: "block",
			type: "identifier",
		},
		{
			kind: "block",
			type: "number",
		},
		{
			kind: "block",
			type: "string",
		},
		{
			kind: "block",
			type: "true",
		},
		{
			kind: "block",
			type: "false",
		},
		{
			kind: "block",
			type: "return_statement",
		},
		{
			kind: "block",
			type: "switch_case",
		},
		{
			kind: "block",
			type: "switch_statement",
		},
	],
};

export const Block = ({ ir, setIr }) => {
	const containerRef = useRef();
	const initializedRef = useRef(false);
	useEffect(() => {
		if (!containerRef.current || initializedRef.current) {
			return;
		}

		initializedRef.current = true;
		Blockly.setLocale(Ja);
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
			renderer: "Zelos",
		});

		workspace.addChangeListener(e => {
			if (e.isUiEvent) return
			const json = Blockly.serialization.workspaces.save(workspace);
			console.log(json);
		});
	}, [containerRef]);

	return <Box ref={containerRef} width="full" height="full"></Box>;
};
