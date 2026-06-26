import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { ExpressionBox } from "../templates/ExpressionBox";

export const CallExpression = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			関数
			<Expression path={[...path, "function"]}></Expression>
			を実行 (引数に
			{node.arguments.map((a, i) => (
				<Expression
					path={[...path, "arguments", i]}
					key={i}
				></Expression>
			))}
			を渡す)
		</ExpressionBox>
	);
};
