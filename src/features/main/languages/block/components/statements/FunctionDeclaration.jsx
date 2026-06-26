import { Box, HStack, Input, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Statements } from "../Statements";
import { StatementBox } from "../templates/StatemenetBox";
import { TextInput } from "../templates/TextInput";

export const FunctionDeclaration = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<VStack alignItems="flex-start">
			<StatementBox colorPlatte="orange">
				<TextInput path={[...path, "name"]}></TextInput>{" "}
				という関数を定義する ({node.parameters.join(", ")}{" "}
				の引数を受け取る)
			</StatementBox>
			<HStack alignItems="stretch">
				<Box background="orange.solid" width="1"></Box>
				<Statements path={[...path, "content"]}></Statements>
			</HStack>
		</VStack>
	);
};
