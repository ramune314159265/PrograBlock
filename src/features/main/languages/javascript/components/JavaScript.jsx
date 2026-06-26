import { Editor } from "@monaco-editor/react";
import microdiff from "microdiff";
import { useEffect, useRef } from "react";
import * as recast from "recast";
import { getFromPath } from "../../../util/getFromPath";
import { convertIrToAstTree, convertJavaScriptToIr } from "../ir";

export const JavaScript = ({ ir, setIr }) => {
	const editorRef = useRef(null);
	const isFocusedRef = useRef(false);
	const lastDataRef = useRef({});
	const changedHandle = (c) => {
		if (!isFocusedRef.current) {
			return;
		}
		const ir = convertJavaScriptToIr(c);
		setIr(ir);
	};
	useEffect(() => {
		if (isFocusedRef.current) {
			return;
		}
		const editorContent = editorRef.current?.getValue?.();
		const ast = convertIrToAstTree(ir);
		const diff = microdiff(lastDataRef.current ?? {}, ast ?? {});
		lastDataRef.current = ast;
		console.log("diff", diff);
		if (diff.length === 0) {
			return;
		}
		const recastAst = recast.parse(editorContent);
		diff.forEach((d) => {
			const path = d.path.slice(0, -1);
			const property = d.path.at(-1);
			const target = getFromPath(recastAst.program.body, path);
			target[property] = d.value;
		});
		editorRef.current?.setValue?.(recast.print(recastAst).code);
	}, [ir]);

	return (
		<Editor
			height="100vh"
			defaultLanguage="javascript"
			theme="vs-dark"
			onMount={(editor) => {
				editorRef.current = editor;
				editor.getModel().onDidChangeContent(() => {
					changedHandle(editor.getValue());
				});
				editor.onDidFocusEditorText(() => {
					isFocusedRef.current = true;
				});
				editor.onDidBlurEditorText(() => {
					isFocusedRef.current = false;
				});
			}}
		></Editor>
	);
};
