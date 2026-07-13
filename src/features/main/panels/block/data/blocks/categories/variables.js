export const variables = {
	name: '変数',
	colorId: 'data',
	blocks: [
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
					text: "変数名",
				},
				{
					type: "input_value",
					name: "value",
				},
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			previousStatement: null,
			nextStatement: null,
			extensions: ['expression_auto_wrap'],
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
			extensions: ['expression_auto_wrap'],
			data: {
				inputs: {
					left: {
						block: {
							kind: "block",
							type: "identifier",
							fields: {
								name: '変数名'
							}
						},
					},
				},
			}
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
					text: "変数名",
				},
				{
					type: "input_dummy",
					name: "name",
				},
			],
			output: null,
			extensions: ['expression_auto_wrap'],
		},
	]
}
