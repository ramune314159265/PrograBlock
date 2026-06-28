import { Editor } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import * as recast from "recast";
import { deepDiff } from '../../../util/deepDiff';
import { getFromPath } from "../../../util/getFromPath";
import { moveByPath } from '../../../util/moveObject';
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
		const diff = deepDiff(lastDataRef.current ?? {}, ast ?? {});
		lastDataRef.current = ast;
		console.log("diff", diff);
		if (diff.length === 0) {
			return;
		}
		const recastAst = recast.parse(editorContent);
		diff.forEach((d) => {
			switch (d.type) {
				case 'CREATE': {
					const path = d.path.slice(0, -1)
					const property = d.path.at(-1)
					const target = getFromPath(recastAst.program.body, path)

					if (Array.isArray(target)) {
						target.splice(property, 0, d.value)
					} else {
						target[property] = d.value
					}
					break
				}

				case 'CHANGE': {
					const path = d.path.slice(0, -1)
					const property = d.path.at(-1)
					const target = getFromPath(recastAst.program.body, path)

					target[property] = d.value
					break
				}

				case 'REMOVE': {
					const path = d.path.slice(0, -1)
					const property = d.path.at(-1)
					const target = getFromPath(recastAst.program.body, path)

					if (Array.isArray(target)) {
						target.splice(property, 1)
					} else {
						delete target[property]
					}
					break
				}

				case 'MOVE': {
					moveByPath(recastAst.program.body, d.oldPath, d.path)
					break
				}
			}
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
