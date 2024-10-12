'use client';
import ReactCodeMirror, { oneDarkTheme } from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { javascript } from '@codemirror/lang-javascript';
import { ClientOnly } from './ClientOnly';
import { FC } from 'react';

interface CodeEditorProps {
	onChange: (value: string) => void;
	type: 'xml' | 'js';
	value?: string;
	editable?: boolean;
}

export const CodeEditor: FC<CodeEditorProps> = ({ value, onChange, type, editable = true }) => {
	return <ClientOnly>
		<ReactCodeMirror className="flex-1" height="100%" value={value} onChange={onChange} extensions={[type === 'xml' ? xml() : javascript()]} theme={oneDarkTheme}
			minHeight='90vh' editable={editable} />
	</ClientOnly>;
};

export default CodeEditor;