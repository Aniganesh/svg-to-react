'use client';
import ReactCodeMirror from '@uiw/react-codemirror';
import { barf } from 'thememirror';
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
		<ReactCodeMirror
			className='w-full'
			height="100%"
			value={value}
			onChange={onChange}
			extensions={[type === 'xml' ? xml() : javascript()]}
			basicSetup={{
				foldGutter: true,
				autocompletion: true,
				lineNumbers: true,
				allowMultipleSelections: true,
				highlightActiveLine: true,
				highlightSelectionMatches: true,
				indentOnInput: true,
				tabSize: 2,
			}}
			theme={barf}
			minHeight='90vh'
			editable={editable} />
	</ClientOnly>;
};

export default CodeEditor;