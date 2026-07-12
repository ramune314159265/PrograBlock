import { Box } from '@chakra-ui/react';
import { Editor } from "@monaco-editor/react";
import { useAtom } from 'jotai';
import { useEffect, useRef } from "react";
import * as recast from "recast";
import { irAtom, javascriptContentAtom } from '../../../states/editor';
import { applyDiff } from "../../../util/applyDiff";
import { convertIrToAstTree, convertJavaScriptToIr } from "../ir";

export const JavaScript = () => {
	const [ir, setIr] = useAtom(irAtom)
	const [javaScriptContent, setJavaScriptContent] = useAtom(javascriptContentAtom)

	const editorRef = useRef(null);
	const isFocusedRef = useRef(false);
	const lastDataRef = useRef({});
	const changedHandle = (c) => {
		if (!isFocusedRef.current) {
			return;
		}

		setJavaScriptContent(c)
		const ir = convertJavaScriptToIr(c);
		setIr(ir);
		const ast = convertIrToAstTree(ir);
		lastDataRef.current = ast;
	};
	useEffect(() => {
		if (isFocusedRef.current) {
			return;
		}

		const ast = convertIrToAstTree(ir);
		const lastAst = lastDataRef.current;
		lastDataRef.current = ast;
		const recastAst = recast.parse(javaScriptContent);
		const appliedRecastAst = applyDiff(
			lastAst,
			ast,
			recastAst.program.body,
			{
				metadataKeys: ["original"],
				idKey: "uid",
			},
		) ?? [];
		console.log(
			structuredClone({ lastAst, ast, appliedRecastAst, recastAst }),
		);
		recastAst.program.body = appliedRecastAst;
		setJavaScriptContent(recast.print(recastAst).code)
	}, [ir]);
	useEffect(() => {
		if (isFocusedRef.current) {
			return;
		}

		editorRef.current?.setValue?.(javaScriptContent)
	}, [javaScriptContent])

	return (
		<Box
			width='full'
			height='full'
			overflow='hidden'
		>
			<Editor
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
		</Box>
	);
};
