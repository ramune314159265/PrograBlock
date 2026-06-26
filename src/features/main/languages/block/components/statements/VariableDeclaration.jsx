import { Input } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { StatementBox } from "../templates/StatemenetBox";
import { TextInput } from "../templates/TextInput";

const variableTypes = {
	const: "定数",
	let: "変数",
	var: "変数",
};

export const VariableDeclaration = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<StatementBox colorPlatte="orange">
			<TextInput path={[...path, "name"]}></TextInput> という{" "}
			{variableTypes[node.variableType]} に{" "}
			<Expression path={[...path, "value"]}></Expression>
			を代入
		</StatementBox>
	);
};
