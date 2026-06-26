import { useDraggable, useDroppable } from "@dnd-kit/react";
import { pointerIntersection } from "@dnd-kit/collision";
import { useContext } from "react";
import { getFromPath } from "../../../util/getFromPath";
import { IrContext } from "./Context";
import { BreakStatement } from "./statements/Break";
import { ExpressionStatement } from "./statements/Expression";
import { FunctionDeclaration } from "./statements/FunctionDeclaration";
import { IfStatement } from "./statements/If";
import { Program } from "./statements/Program";
import { ReturnStatement } from "./statements/Return";
import { SwitchStatement } from "./statements/Switch";
import { SwitchCase } from "./statements/SwitchCase";
import { VariableDeclaration } from "./statements/VariableDeclaration";
import { Box } from "@chakra-ui/react";

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

export const Statement = ({ path }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);
	const n = nodeTypes[node?.type];
	const { ref: draggableRef, isDragging } = useDraggable({
		disabled: !n?.component,
		id: path.join("."),
		data: {
			path,
			type: "expression",
		},
	});
	const { ref: droppableRef } = useDroppable({
		id: path.join("."),
		collisionDetector: pointerIntersection,
		collisionPriority: path.length,
		data: {
			path,
			type: "expression",
		},
	});
	const blockState = isDragging ? "dragging" : "";

	return (
		<Box
			ref={(ref) => {
				draggableRef(ref);
				droppableRef(ref);
			}}
		>
			{n?.component ? (
				<n.component path={[...path]}></n.component>
			) : (
				<></>
			)}
		</Box>
	);
};
