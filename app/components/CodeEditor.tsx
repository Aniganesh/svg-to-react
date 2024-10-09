'use client';
import ReactCodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { javascript } from '@codemirror/lang-javascript';
import { ClientOnly } from './ClientOnly';
import { FC } from 'react';

interface CodeEditorProps {
	value: string;
	type: 'xml' | 'js';
}

export const CodeEditor: FC<CodeEditorProps> = ({ value, type }) => {
	return <ClientOnly>
		<ReactCodeMirror className="flex-1" height="100%" value={value} extensions={[type === 'xml' ? xml() : javascript()]} />
	</ClientOnly>;
};

export default CodeEditor;