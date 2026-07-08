import { Editor } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import * as recast from "recast";
import { applyDiff } from "../../../util/applyDiff";
import { convertIrToAstTree, convertJavaScriptToIr } from "../ir";

export const JavaScript = ({ ir, setIr }) => {
	const editorRef = useRef(null);
	const isFocusedRef = useRef(false);
	const lastDataRef = useRef({});
	const changedHandle = (c) => {
		console.log(convertJavaScriptToIr(c));
		if (!isFocusedRef.current) {
			return;
		}
		const ir = convertJavaScriptToIr(c);
		setIr(ir);
		const editorContent = editorRef.current?.getValue?.();
		const ast = convertIrToAstTree(ir);
		lastDataRef.current = ast;
	};
	useEffect(() => {
		if (isFocusedRef.current) {
			return;
		}
		const editorContent = editorRef.current?.getValue?.();
		const ast = convertIrToAstTree(ir);
		const lastAst = lastDataRef.current;
		lastDataRef.current = ast;
		const recastAst = recast.parse(editorContent);
		const appliedRecastAst = applyDiff(
			lastAst,
			ast,
			recastAst.program.body,
			{
				metadataKeys: ["original"],
				idKey: "uid",
			},
		);
		console.log(
			structuredClone({ lastAst, ast, appliedRecastAst, recastAst }),
		);
		recastAst.program.body = appliedRecastAst;
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
