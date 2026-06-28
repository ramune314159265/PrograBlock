import { Feedback } from '@dnd-kit/dom';
import { DragDropProvider } from "@dnd-kit/react";
import { getFromPath } from "../../../util/getFromPath";
import { IrContext } from "./Context";
import { Statements } from "./Statements";

export const Block = ({ ir, setIr }) => {
	return (
		<DragDropProvider
			plugins={(defaults) => [
				...defaults,
				Feedback.configure({ dropAnimation: null }),
			]}
			onDragEnd={(e) => {
				if (e.canceled) return;
				const from = e.operation.source?.data?.path;
				if (!from) {
					return;
				}
				const fromPath = from.slice(0, -1);
				const fromProperty = from.at(-1);
				const fromType = e.operation.source?.data?.type;

				const to = e.operation.target?.data?.path;
				if (!to) {
					return;
				}
				const toPath = to.slice(0, -1);
				const toProperty = to.at(-1);
				const toType = e.operation.target?.data?.type;
				if (e.operation.source?.data?.type === 'statement' && e.operation.target?.data?.type === 'expression') {
					return
				}

				console.log({
					from,
					fromPath,
					fromProperty,
					to,
					toPath,
					toProperty,
				});
				const copy = structuredClone(ir);
				const copyFrom = getFromPath(copy, fromPath);
				const copyTo = getFromPath(copy, toPath);
				switch (true) {
					case (fromType === 'statement' && toType === 'statement'): {
						const node = copyFrom[fromProperty]
						copyFrom.splice(fromProperty, 1)

						let insertIndex = toProperty
						if (copyFrom === copyTo && fromProperty < toProperty) {
							insertIndex--
						}
						copyTo.splice(insertIndex + 1, 0, node)

						setIr(copy)
						break
					}
					case (fromType === 'statement' && toType === 'expression'):
						break
					case (fromType === 'expression' && toType === 'statement'): {

					}
					case (fromType === 'expression' && toType === 'expression'): {
						copyTo[toProperty] = copyFrom[fromProperty];
						const fromData = structuredClone(copyFrom[fromProperty]);
						copyFrom[fromProperty] = {
							type: "empty",
							placeholder: fromData,
						};
						console.log(copy)
						setIr(copy);
					}
				}
			}}
		>
			<IrContext value={[ir, setIr]}>
				<Statements path={[]}></Statements>
			</IrContext>
		</DragDropProvider>
	);
};
