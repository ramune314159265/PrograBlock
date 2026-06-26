import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { ExpressionBox } from "../templates/ExpressionBox";

export const FalseExpression = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return <ExpressionBox colorPlatte="blue" blockState={blockState}>偽</ExpressionBox>;
};
