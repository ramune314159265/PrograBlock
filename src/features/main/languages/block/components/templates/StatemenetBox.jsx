import { HStack } from "@chakra-ui/react"

export const StatementBox = ({ children, colorPlatte }) => {
	return (
		<HStack
			color="fg.inverted"
			background={`${colorPlatte}.solid`}
			padding={1}
			cursor="grab"
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
