import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { ExpressionBox } from "../templates/ExpressionBox";

export const AssignmentExpression = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			<Expression path={[...path, "left"]}></Expression>に
			<Expression path={[...path, "right"]}></Expression>
			を代入
		</ExpressionBox>
	);
};
