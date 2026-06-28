import { HStack } from "@chakra-ui/react";

export const ExpressionBox = ({ children, colorPlatte, blockState }) => {
	return (
		<HStack
			height="full"
			alignItems="center"
			justifyContent="center"
			background={`${colorPlatte}.solid`}
			padding={0.5}
			cursor="grab"
			borderRadius="full"
			whiteSpace="nowrap"
			outlineStyle="solid"
			outlineWidth={blockState === "dragging" ? "3px" : "1px"}
			outlineColor={`${colorPlatte}.border`}
		>
			{children}
		</HStack>
	);
};
