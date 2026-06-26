import { Input } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { ExpressionBox } from "../templates/ExpressionBox";
import { TextInput } from "../templates/TextInput";

export const IndentifierExpression = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<ExpressionBox colorPlatte="blue" blockState={blockState}>
			変数
			<TextInput path={[...path, "name"]}></TextInput>
		</ExpressionBox>
	);
};
