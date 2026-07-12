export const functions = {
	name: '関数',
	colorId: 'more',
	blocks: [
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
		},
		{
			type: "return_statement",
			tooltip: "値を指定した場合は値を返し、現在の関数を終了します",
			helpUrl: "",
			message0: "値 %1 を返し、関数を終了する %2",
			args0: [
				{
					type: "input_value",
					name: "content",
				},
				{
					type: "input_end_row",
					name: "d1",
				},
			],
			previousStatement: null,
			nextStatement: null,
		},
		{
			type: "call_expression",
			tooltip: "関数を実行し、その関数が値を返した場合にはその結果を返します",
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
			data: {
				inputs: {
					function: {
						block: {
							kind: "block",
							type: "identifier",
							fields: {
								name: 'func'
							}
						},
					},
				},
			}
		},
	]
}
