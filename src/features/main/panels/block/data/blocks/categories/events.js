export const events = {
	name: 'イベント',
	colorId: 'event',
	blocks: [
		{
			type: "start",
			tooltip: "プログラムが開始されたとき、下に連なってるブロックを順に実行します",
			helpUrl: "",
			message0: "プログラム開始 %1",
			args0: [
				{
					type: "input_dummy",
					name: "d1"
				}
			],
			nextStatement: null,
			extensions: ['colours_event', 'shape_hat']
		},
	]
}
