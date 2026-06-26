import { Box, HStack, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { Statements } from "../Statements";
import { StatementBox } from "../templates/StatemenetBox";

export const SwitchCase = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<VStack alignItems="flex-start">
			{node.condition ? (
				<StatementBox colorPlatte="orange">
					<Expression path={[...path, "condition"]}></Expression>{" "}
					の場合
				</StatementBox>
			) : (
				<StatementBox colorPlatte="orange">
					どれにも当てはまらない場合
				</StatementBox>
			)}
			<HStack alignItems="stretch">
				<Box background="orange.solid" width="1"></Box>
				<Statements path={[...path, "content"]}></Statements>
			</HStack>
		</VStack>
	);
};
