import { Box } from "@chakra-ui/react";
import { pointerIntersection } from "@dnd-kit/collision";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { useContext } from "react";
import { getFromPath } from "../../../util/getFromPath";
import { IrContext } from "./Context";
import { AssignmentExpression } from "./expressions/Assignment";
import { BinaryExpression } from "./expressions/Binary";
import { CallExpression } from "./expressions/Call";
import { ConditionalExpression } from "./expressions/Conditional";
import { FalseExpression } from "./expressions/False";
import { IndentifierExpression } from "./expressions/Indentifier";
import { NullExpression } from "./expressions/Null";
import { NumberExpression } from "./expressions/Number";
import { ParenthesizedExpression } from "./expressions/Parenthesized";
import { StringExpression } from "./expressions/String";
import { TrueExpression } from "./expressions/True";
import { UnaryExpression } from "./expressions/Unary";
import { UndefinedExpression } from "./expressions/Undefined";
import { AdditionOperator } from "./expressions/operators/Addition";
import { DivisionOperator } from "./expressions/operators/Division";
import { EqualOperator } from "./expressions/operators/Equal";
import { ExponentiationOperator } from "./expressions/operators/Exponentiation";
import { GreaterThanOperator } from "./expressions/operators/GreaterThan";
import { GreaterThanOrEqualOperator } from "./expressions/operators/GreaterThanOrEqual";
import { LessThanOperator } from "./expressions/operators/LessThan";
import { LessThanOrEqualOperator } from "./expressions/operators/LessThanOrEqual";
import { LogicalAndOperator } from "./expressions/operators/LogicalAnd";
import { LogicalOrOperator } from "./expressions/operators/LogicalOr";
import { MultiplicationOperator } from "./expressions/operators/Multiplication";
import { NotEqualOperator } from "./expressions/operators/NotEqual";
import { NullishCoalescingOperator } from "./expressions/operators/NullishCoalescing";
import { RemainderOperator } from "./expressions/operators/Remainder";
import { SubtractionOperator } from "./expressions/operators/Subtraction";

const nodeTypes = {
	string: {
		component: StringExpression,
	},
	number: {
		component: NumberExpression,
	},
	true: {
		component: TrueExpression,
	},
	false: {
		component: FalseExpression,
	},
	undefined: {
		component: UndefinedExpression,
	},
	null: {
		component: NullExpression,
	},
	unary_expression: {
		component: UnaryExpression,
	},
	binary_expression: {
		component: BinaryExpression,
	},
	conditional_expression: {
		component: ConditionalExpression,
	},
	parenthesized_expression: {
		component: ParenthesizedExpression,
	},
	identifier: {
		component: IndentifierExpression,
	},
	assignment_expression: {
		component: AssignmentExpression,
	},
	call_expression: {
		component: CallExpression,
	},

	equal: {
		component: EqualOperator,
	},
	not_equal: {
		component: NotEqualOperator,
	},
	greater_than: {
		component: GreaterThanOperator,
	},
	greater_than_or_equal: {
		component: GreaterThanOrEqualOperator,
	},
	less_than: {
		component: LessThanOperator,
	},
	less_than_or_equal: {
		component: LessThanOrEqualOperator,
	},
	remainder: {
		component: RemainderOperator,
	},
	addition: {
		component: AdditionOperator,
	},
	subtraction: {
		component: SubtractionOperator,
	},
	multiplication: {
		component: MultiplicationOperator,
	},
	division: {
		component: DivisionOperator,
	},
	exponentiation: {
		component: ExponentiationOperator,
	},
	logical_and: {
		component: LogicalAndOperator,
	},
	logical_or: {
		component: LogicalOrOperator,
	},
	nullish_coalescing: {
		component: NullishCoalescingOperator,
	},

	empty: {
		component: null,
	},
};

export const Expression = ({ path }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const node = getFromPath(nodeRoot, path);
	const n = nodeTypes[node?.type];
	const { ref: draggableRef, isDragging } = useDraggable({
		disabled: !n.component,
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
			minWidth="6ch"
			height="full"
			minHeight="1.25lh"
			borderRadius="full"
			background="bg"
			ref={(ref) => {
				draggableRef(ref);
				droppableRef(ref);
			}}
		>
			{n?.component ? (
				<n.component path={path} blockState={blockState}></n.component>
			) : (
				<></>
			)}
		</Box>
	);
};
