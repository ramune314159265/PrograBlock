import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { StatementBox } from "../templates/StatemenetBox";

export const ReturnStatement = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<StatementBox colorPlatte="orange">
			<Expression path={[...path, "content"]}></Expression>{" "}
			を返し、関数を終了
		</StatementBox>
	);
};
