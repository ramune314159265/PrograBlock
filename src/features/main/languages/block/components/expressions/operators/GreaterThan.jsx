import { useContext } from "react";
import { getFromPath } from "../../../../../util/getFromPath";
import { IrContext } from "../../Context";
import { Expression } from "../../Expression";
import { ExpressionBox } from "../../templates/ExpressionBox";

export const GreaterThanOperator = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			<Expression path={[...path, "left"]}></Expression>
			{">"}
			<Expression path={[...path, "right"]}></Expression>
		</ExpressionBox>
	);
};
