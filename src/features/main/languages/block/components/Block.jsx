import { DragDropProvider } from "@dnd-kit/react";
import { getFromPath } from "../../../util/getFromPath";
import { IrContext } from "./Context";
import { Statements } from "./Statements";

export const Block = ({ ir, setIr }) => {
	return (
		<DragDropProvider
			onDragEnd={(e) => {
				if (e.canceled) return;
				const from = e.operation.source?.data?.path;
				if (!from) {
					return;
				}
				const fromPath = from.slice(0, -1);
				const fromProperty = from.at(-1);

				const to = e.operation.target?.data?.path;
				if (!to) {
					return;
				}
				const toPath = to.slice(0, -1);
				const toProperty = to.at(-1);

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
				copyTo[toProperty] = copyFrom[fromProperty];
				const fromData = copyFrom[fromProperty];
				copyFrom[fromProperty] = {
					type: "empty",
					placeholder: fromData,
				};
				setIr(copy);
			}}
		>
			<IrContext value={[ir, setIr]}>
				<Statements path={[]}></Statements>
			</IrContext>
		</DragDropProvider>
	);
};
