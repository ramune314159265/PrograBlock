import { Box, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { getFromPath } from "../../../util/getFromPath";
import { IrContext } from "./Context";
import { Statement } from "./Statement";
import { BreakStatement } from "./statements/Break";
import { ExpressionStatement } from "./statements/Expression";
import { FunctionDeclaration } from "./statements/FunctionDeclaration";
import { IfStatement } from "./statements/If";
import { Program } from "./statements/Program";
import { ReturnStatement } from "./statements/Return";
import { SwitchStatement } from "./statements/Switch";
import { SwitchCase } from "./statements/SwitchCase";
import { VariableDeclaration } from "./statements/VariableDeclaration";
import { StatementDropZone } from './templates/StatementDropZone';

const nodeTypes = {
	program: {
		component: Program,
	},
	variable_declaration: {
		component: VariableDeclaration,
	},
	if_statement: {
		component: IfStatement,
	},
	switch_statement: {
		component: SwitchStatement,
	},
	switch_case: {
		component: SwitchCase,
	},
	function_declaration: {
		component: FunctionDeclaration,
	},
	return_statement: {
		component: ReturnStatement,
	},
	break_statement: {
		component: BreakStatement,
	},
	expression_statement: {
		component: ExpressionStatement,
	},
};

export const Statements = ({ path, blockState }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);
	if (!node) {
		return <></>;
	}

	return (
		<VStack alignItems="flex-start">
			<Box position="relative" width={64}>
				<StatementDropZone path={[...path, -1]}></StatementDropZone>
			</Box>
			{node.map((c, i) => (
				<Statement key={i} path={[...path, i]}></Statement>
			))}
		</VStack>
	);
};
