import { Box } from '@chakra-ui/react';
import { pointerIntersection } from "@dnd-kit/collision";
import { useDragDropMonitor, useDroppable } from '@dnd-kit/react';
import { useState } from 'react';

export const StatementDropZone = ({ path }) => {
	const [isDragging, setIsDragging] = useState(false)
	const { ref: droppableRef } = useDroppable({
		id: path.join("."),
		collisionDetector: pointerIntersection,
		collisionPriority: path.length,
		data: {
			path,
			type: "statement",
		},
	});
	useDragDropMonitor({
		onDragStart() {
			setIsDragging(true)
		},
		onDragEnd() {
			setIsDragging(false)
		}
	})

	return (
		<Box
			ref={droppableRef}
			display={isDragging ? null : 'none'}
			position="absolute"
			zIndex="overlay"
			width="full"
			height={4}
			translate="0 -50%"
			background="gray.solid"
			opacity={0.2}
		></Box>
	)
}
