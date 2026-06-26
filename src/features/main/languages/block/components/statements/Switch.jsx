import { Box, HStack, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { Statements } from "../Statements";
import { StatementBox } from "../templates/StatemenetBox";

export const SwitchStatement = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<VStack alignItems="flex-start">
			<StatementBox colorPlatte="orange">
				もし <Expression path={[...path, "discriminant"]}></Expression>{" "}
				が
			</StatementBox>
			<HStack alignItems="stretch">
				<Box background="orange.solid" width="1"></Box>
				<Statements path={[...path, "cases"]}></Statements>
			</HStack>
		</VStack>
	);
};
