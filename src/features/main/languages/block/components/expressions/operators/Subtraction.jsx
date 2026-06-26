import { useContext } from "react";
import { getFromPath } from "../../../../../util/getFromPath";
import { IrContext } from "../../Context";
import { Expression } from "../../Expression";
import { ExpressionBox } from "../../templates/ExpressionBox";

export const SubtractionOperator = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			<Expression path={[...path, "left"]}></Expression>ー
			<Expression path={[...path, "right"]}></Expression>
		</ExpressionBox>
	);
};
