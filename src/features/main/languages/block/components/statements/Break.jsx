import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { StatementBox } from "../templates/StatemenetBox";

export const BreakStatement = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return <StatementBox colorPlatte="orange">この段から抜け出す</StatementBox>;
};
