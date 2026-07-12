import * as ScratchBlocks from "scratch-blocks";

class ExpressionWrappingDragStrategy extends ScratchBlocks.dragging.BlockDragStrategy {
	constructor(block) {
		super(block);
		this.draggedBlock_ = block;
	}

	async endDrag(e) {
		const block = this.draggedBlock_;
		const outputConn = block.outputConnection;

		super.endDrag(e);

		// ★ トラッシュ/削除などでブロックが破棄されていたら即終了
		if (block.isDisposed() || !block.workspace) {
			return;
		}

		if (!outputConn) {
			return;
		}

		await ScratchBlocks.renderManagement.finishQueuedRenders();

		// ★ awaitの間に別の操作で破棄される可能性もあるので二重チェック
		if (block.isDisposed() || !block.workspace) {
			return;
		}

		if (outputConn.targetConnection) {
			return;
		}

		const stmtTarget = this.findNearbyStatementConnection_(outputConn);
		if (!stmtTarget) {
			return;
		}

		ScratchBlocks.Events.setGroup(true);
		try {
			this.wrapInExpressionStatement_(block, stmtTarget);
		} finally {
			ScratchBlocks.Events.setGroup(false);
		}
	}

	findNearbyStatementConnection_(outputConn) {
		const ws = this.draggedBlock_.workspace;
		const radius = ScratchBlocks.config.snapRadius;
		let best = null;
		let bestDist = radius;

		for (const type of [ScratchBlocks.PREVIOUS_STATEMENT, ScratchBlocks.NEXT_STATEMENT]) {
			const db = ws.connectionDBList[type];
			const neighbours = db.getNeighbours(outputConn, radius);
			for (const conn of neighbours) {
				if (conn.getSourceBlock() === this.draggedBlock_) continue;
				const dist = ScratchBlocks.utils.Coordinate.distance(outputConn, conn);
				if (dist < bestDist) {
					best = conn;
					bestDist = dist;
				}
			}
		}
		return best;
	}

	wrapInExpressionStatement_(block, targetConn) {
		const ws = block.workspace;

		// ★ 現在のスクロール位置を保存
		const scrollX = ws.scrollX;
		const scrollY = ws.scrollY;

		const wrapper = ws.newBlock('expression_statement');
		wrapper.initSvg();

		const xy = block.getRelativeToSurfaceXY();
		wrapper.moveBy(xy.x, xy.y);

		if (targetConn.type === ScratchBlocks.PREVIOUS_STATEMENT) {
			const aboveConn = targetConn.targetConnection;
			if (aboveConn) {
				aboveConn.disconnect();
				aboveConn.connect(wrapper.previousConnection);
			}
			targetConn.connect(wrapper.nextConnection);
		} else {
			const belowConn = targetConn.targetConnection;
			targetConn.connect(wrapper.previousConnection);
			if (belowConn) {
				belowConn.disconnect();
				wrapper.nextConnection.connect(belowConn);
			}
		}

		wrapper.getInput('content').connection.connect(block.outputConnection);
		wrapper.render();

		ws.scroll(scrollX, scrollY);
	}
}

export const expressionAutoWrapExtensions = {
	expression_auto_wrap: b => b.setDragStrategy(new ExpressionWrappingDragStrategy(b))
}
