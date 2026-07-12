export const operators = {
	name: '演算',
	colorId: 'sounds',
	blocks: [
		{
			type: "equal_expression",
			tooltip: "2つの値が等しいか判定します",
			helpUrl: "",
			message0: "%1 と %3 が %2 かどうか %4",
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
					name: "right",
				},
				{
					type: "input_end_row",
					name: "d1",
				},
			],
			output: null,
		},
		{
			type: "comparison_expression",
			tooltip: "数値の比較をします",
			helpUrl: "",
			message0: "%1 %2 %3 であるか %4",
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
					name: "right",
				},
				{
					type: "input_end_row",
					name: "d1",
				},
			],
			output: null,
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
					name: "right",
				},
				{
					type: "input_end_row",
					name: "d1",
				},
			],
			output: null,
		},
		{
			type: "conditional_expression",
			tooltip: "三項演算子",
			helpUrl: "",
			message0: "もし %1 が真なら %2 の値、偽なら %3 の値 %4",
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
			extensions: ['expression_auto_wrap'],
		},
	]
}
