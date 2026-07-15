import { Box, Button, Center, Code, CodeBlockCode, CodeBlockCodeText, CodeBlockContent, CodeBlockRoot, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, HStack, Text, VStack } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { appInfo } from '../../../data/appInfo'

const fallback = ({ error, resetErrorBoundary }) => {
	return (
		<Center
			width="full"
			height="full"
			padding={4}
		>
			<VStack width="full">
				<Text userSelect="text">エラーが発生しました</Text>
				<Code userSelect="text">{error.message}</Code>
				<HStack>
					<Button onClick={resetErrorBoundary}>再試行</Button>
					<Button variant="outline" asChild><a href={appInfo.issues} target='_blank'>エラーを報告</a></Button>
				</HStack>
				<Box
					width="full"
					overflow="auto"
				>
					<CollapsibleRoot>
						<CollapsibleTrigger width="full">
							<Text textAlign="center">トレースを開く</Text>
						</CollapsibleTrigger>
						<CollapsibleContent>

							<CodeBlockRoot code={error.stack} userSelect="text">
								<CodeBlockContent>
									<CodeBlockCode>
										<CodeBlockCodeText />
									</CodeBlockCode>
								</CodeBlockContent>
							</CodeBlockRoot>

						</CollapsibleContent>
					</CollapsibleRoot>
				</Box>
			</VStack>
		</Center>
	)
}

export const PanelErrorBoundary = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={fallback}>{children}</ErrorBoundary>
	)
}
