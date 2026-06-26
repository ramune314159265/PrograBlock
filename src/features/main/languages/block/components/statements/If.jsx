import { Box, HStack, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Expression } from "../Expression";
import { Statements } from "../Statements";
import { StatementBox } from "../templates/StatemenetBox";

export const IfStatement = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);

	return (
		<VStack alignItems="flex-start">
			<StatementBox colorPlatte="orange">
				もし
				<Expression path={[...path, "condition"]}></Expression>
				なら
			</StatementBox>
			<HStack alignItems="stretch">
				<Box background="orange.solid" width="1"></Box>
				<Statements path={[...path, "content"]}></Statements>
			</HStack>
			{node.alternative ? (
				<>
					<StatementBox colorPlatte="orange">でなければ</StatementBox>
					<HStack alignItems="stretch">
						<Box background="orange.solid" width="1"></Box>
						<Statements
							path={[...path, "alternative"]}
						></Statements>
					</HStack>
				</>
			) : (
				<></>
			)}
		</VStack>
	);
};
