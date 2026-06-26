import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { ExpressionBox } from "../templates/ExpressionBox";

export const ConditionalExpression = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			<Expression path={[...path, "condition"]}></Expression>が真なら
			<Expression path={[...path, "content"]}></Expression>、偽なら
			<Expression path={[...path, "alternative"]}></Expression>
		</ExpressionBox>
	);
};
