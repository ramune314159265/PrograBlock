import { HStack } from "@chakra-ui/react"

export const StatementBox = ({ children, colorPlatte }) => {
	return (
		<HStack
			padding={1}
			color="fg.inverted"
			background={`${colorPlatte}.solid`}
			whiteSpace="nowrap"
			gap={1}
			borderRadius="md"
			outlineStyle="solid"
			outlineWidth="1px"
			outlineColor={`${colorPlatte}.border`}
		>
			{children}
		</HStack>
	)

}
