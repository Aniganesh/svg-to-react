import { ClipboardCopy, Download } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { TemplateOptions, convertSvgToReact } from '~/script';
import { DeepPartial } from '~/util-types';
import { CodeEditor } from './CodeEditor';
import { TemplateCustomiser } from './TemplateCustomiser';
import { Button } from './ui/button';

interface CodeConvertorProps { }

export const CodeConvertor: FC<CodeConvertorProps> = () => {
	const [js, setJs] = useState("");
	const lastXMLValueRef = useRef<string>("");
	const componentNameRef = useRef<string>("MyIcon");
	const [conversionOptions, setConversionOptions] = useState<DeepPartial<TemplateOptions>>({
		addDefaultExport: true,
		language: "ts",
		interfaceExtend: undefined,
	});

	const handleXmlChange = async (value?: string) => {
		if (value) {
			lastXMLValueRef.current = value;
		}
		if (lastXMLValueRef.current)
			setJs(await convertSvgToReact(lastXMLValueRef.current, componentNameRef.current, conversionOptions));
	};

	const handleComponentNameChange = (value: string) => {
		componentNameRef.current = value;
		handleXmlChange();
	};

	const copyJS = () => {
		navigator.clipboard.writeText(js);
	};

	const downloadJS = () => {
		const extension = conversionOptions.language === "ts" ? ".tsx" : ".jsx";
		const blob = new Blob([js], { type: "text/typescript" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${componentNameRef.current}${extension}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	useEffect(() => {
		handleXmlChange();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conversionOptions]);

		return <div className="grid grid-cols-12 gap-4 h-full relative">
		<div className="col-span-5 h-full">
			{!!componentNameRef && !!handleComponentNameChange && <input
				type="text"
				defaultValue={componentNameRef.current}
				className="p-2 text-white outline-none bg-transparent border-b border-transparent focus:border-white flex-1"
				onChange={(e) => {
					handleComponentNameChange(e.target.value);
				}}
				placeholder="Enter component name"
			/>}
			<CodeEditor onChange={handleXmlChange} type="xml" />
		</div>
		<div className="relative col-span-5">
			<div className="absolute right-2 top-2 z-10 flex gap-2">
				<Button className="shadow-xl shadow-slate-700/50" onClick={copyJS}><ClipboardCopy size={18} /></Button>
				<Button className="shadow-xl shadow-slate-700/50" onClick={downloadJS}><Download size={18} /></Button>
			</div>
			<CodeEditor value={js} onChange={setJs} type="js" editable={false} />
		</div>
		<div className='col-span-2'>
			<TemplateCustomiser
				conversionOptions={conversionOptions}
				setConversionOptions={setConversionOptions}
			/>
		</div>
	</div>
		;
};

export default CodeConvertor;