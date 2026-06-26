import { useContext } from "react";
import { getFromPath } from "../../../../util/getFromPath";
import { IrContext } from "../Context";
import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { useEffect } from "react";

export const TextInput = ({ path }) => {
	const [nodeRoot, setNodeRoot] = useContext(IrContext);
	const content = getFromPath(nodeRoot, path);
	const inputRef = useRef(null);
	const isFocusingRef = useRef(false);
	useEffect(() => {
		if (isFocusingRef.current) {
			return;
		}
		inputRef.current.textContent = content ?? "";
	}, [content, isFocusingRef]);
	const beforeInputHandle = (e) => {
		if (
			[
				"insertText",
				"insertReplacementText",
				"insertCompositionText",
				"insertFromPaste",
				"historyUndo",
				"historyRedo",
				"deleteWordBackward",
				"deleteWordForward",
				"deleteSoftLineBackward",
				"deleteSoftLineForward",
				"deleteEntireSoftLine",
				"deleteHardLineBackward",
				"deleteHardLineForward",
				"deleteByDrag",
				"deleteByCut",
				"deleteContent",
				"deleteContentBackward",
				"deleteContentForward",
			].includes(e.inputType)
		) {
			return;
		}
		e.preventDefault();
	};
	useEffect(() => {
		const inputElement = inputRef.current;
		inputElement?.addEventListener("beforeinput", beforeInputHandle);
		return () =>
			inputElement?.removeEventListener("beforeinput", beforeInputHandle);
	});

	return (
		<Box
			ref={inputRef}
			onInput={(e) => {
				const copy = structuredClone(nodeRoot);
				const p = path.slice(0, -1);
				const property = path.at(-1);
				const copyNode = getFromPath(copy, p);
				copyNode[property] = e.target.textContent;
				setNodeRoot(copy);
			}}
			onFocus={() => (isFocusingRef.current = true)}
			onBlur={() => (isFocusingRef.current = false)}
			contentEditable
			suppressContentEditableWarning
			paddingBlock={1}
			paddingInline={2}
			display="inline-block"
			minWidth="8ch"
			borderRadius="full"
			color="fg"
			background="bg"
			cursor="text"
			fontSize="sm"
			whiteSpace="nowrap"
		></Box>
	);
};
