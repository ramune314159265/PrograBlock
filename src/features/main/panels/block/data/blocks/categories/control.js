export const control = {
	name: '制御',
	colorId: 'control',
	blocks: [
		{
			type: "expression_statement",
			tooltip: "中身の実行のみを行い、結果の値は捨てます",
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
		},
		{
			type: "switch_statement",
			tooltip: "値がそれぞれの場合に当てはまるかどうかで分岐します",
			helpUrl: "",
			message0: "もし %1 が... %2 %3",
			args0: [
				{
					type: "input_value",
					name: "discriminant",
				},
				{
					type: "input_dummy",
					name: "d1",
				},
				{
					type: "input_statement",
					name: "cases",
					check: ["switch_case"],
				},
			],
			previousStatement: null,
			nextStatement: null,
			data: {
				inputs: {
					cases: {
						block: {
							kind: "block",
							type: "switch_case",
							next: {
								block: {
									kind: "block",
									type: "switch_case",
								},
							},
						},
					},
				},
			}
		}, {
			"type": "for_statement",
			"tooltip": "変数を作り、条件に合う限りループします",
			"helpUrl": "",
			"message0": "ループ変数 %1 %2 (初期値 %3 )を定義し、 %4 の限りループする %5 %6 ループ変数の更新処理 %7 %8",
			"args0": [
				{
					"type": "field_input",
					"name": "variable",
					"text": "回数"
				},
				{
					"type": "input_dummy",
					"name": "d1"
				},
				{
					"type": "input_value",
					"name": "init"
				},
				{
					"type": "input_value",
					"name": "condition"
				},
				{
					"type": "input_dummy",
					"name": "d2"
				},
				{
					"type": "input_statement",
					"name": "content"
				},
				{
					"type": "input_value",
					"name": "update"
				},
				{
					"type": "input_end_row",
					"name": "d3"
				}
			],
			"previousStatement": null,
			"nextStatement": null,
		},
		{
			type: "switch_case",
			tooltip: "",
			helpUrl: "",
			message0: "%1 の場合 %2 %3",
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
			previousStatement: ["switch_statement", "switch_case"],
			nextStatement: ["switch_case"],
		},
		{
			type: "break_statement",
			tooltip: "ループ、switchから抜け出します",
			helpUrl: "",
			message0: "処理を終了する %1",
			args0: [
				{
					type: "input_dummy",
					name: "d1",
				},
			],
			previousStatement: null,
			nextStatement: null,
		},
	]
}
