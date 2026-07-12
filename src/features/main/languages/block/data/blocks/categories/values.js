export const values = {
	name: '値',
	colorId: 'motion',
	blocks: [
		{
			type: "number",
			tooltip: "number",
			helpUrl: "",
			message0: "数値 %1 %2",
			args0: [
				{
					type: "input_value",
					name: "content",
					value: 0,
				},
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			output: null,
		},
		{
			type: "string",
			tooltip: "string",
			helpUrl: "",
			message0: "文字列 %1 %2",
			args0: [
				{
					type: "field_input",
					name: "content",
					text: "",
				},
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			output: null,
		},
		{
			type: "true",
			tooltip: "true",
			helpUrl: "",
			message0: "真 %1",
			args0: [
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			output: null,
		},
		{
			type: "false",
			tooltip: "false",
			helpUrl: "",
			message0: "偽 %1",
			args0: [
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			output: null,
		},
	]
}
