import React, { useCallback, useState } from "react";
import { BlobReader, ZipReader, TextWriter, BlobWriter, ZipWriter, TextReader } from "@zip.js/zip.js";
import { convertSvgToReact, TemplateOptions, toStartCase } from "../script";
import { Button } from "~/components/ui/button";
import { TemplateCustomizer } from "./TemplateCustomiser";
import { DeepPartial } from "~/util-types";
import { useDropzone } from 'react-dropzone-esm';
import { cn } from "~/lib/utils";

interface FilesConvertorProps { }

const downloadFile = (url: string, filename: string) => {
	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = filename;
	downloadLink.click();
};

export const FilesConvertor: React.FC<FilesConvertorProps> = () => {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [conversionOptions, setConversionOptions] = useState<DeepPartial<TemplateOptions>>({
		addDefaultExport: true,
		language: "ts",
	});


	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (!file) {
			return;
		}
		setFile(file);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { file: ['image/svg+xml', 'application/zip'] },
	});



	const handleConvert = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!file) {
			return;
		}
		if (file.type === "application/zip") {
			const zipFileReader = new BlobReader(file);
			const files = await (await new ZipReader(zipFileReader)).getEntries();
			const res = await Promise.all(files.map(async (file) => {
				if (!file.getData) return "";
				console.log(file.filename);
				const textContentWriter = new TextWriter();
				const content = await file.getData(textContentWriter);
				const componentName = toStartCase(file.filename.replace(/\.[^/.]+$/, ""));
				const svgContent = await convertSvgToReact(content, componentName, conversionOptions as TemplateOptions);
				return { content: svgContent, name: componentName };
			}));

			const zipFileWriter = new BlobWriter();
			const zipWriter = new ZipWriter(zipFileWriter);

			res.filter((v) => !!v).forEach((file) =>
				zipWriter.add(`${file.name}.${conversionOptions.language === "ts" ? "tsx" : "jsx"}`, new TextReader(file.content))
			);

			const url = URL.createObjectURL(await zipWriter.close());
			downloadFile(url, `react-components.zip`);
			return;
		}
		const fileContent = await file.text();
		const componentName = toStartCase(file.name.replace(/\.[^/.]+$/, ""));
		const svgContent = await convertSvgToReact(fileContent, componentName, conversionOptions as TemplateOptions);
		const blob = new Blob([svgContent], { type: "text/plain", });
		const url = URL.createObjectURL(blob);
		downloadFile(url, `${componentName}.${conversionOptions.language === "ts" ? "tsx" : "jsx"}`);
	};

	return (
		<>
			<div className="flex justify-center">
				<TemplateCustomizer
					conversionOptions={conversionOptions}
					setConversionOptions={setConversionOptions}
				/>
			</div>
			<div className={cn("flex items-center justify-center min-h-full border-dashed border-2 border-gray-600 rounded-lg", {
				'bg-gray-500/50': isDragActive,
			})} {...getRootProps()}>
				<div className="w-full max-w-3xl gap-8 flex flex-col items-center">
					<div className="gap-6 w-full flex flex-col items-center justify-center">

						<label htmlFor="file" className="block text-xl font-medium text-gray-300 text-center">
							{!file ? "Drop or click to upload SVG or ZIP file" : file.name}
						</label>
						<input
							{...getInputProps()}
							title=" "
							type="file"
							name="file"
							id="file"
							accept="image/svg+xml, application/zip"
							multiple
						/>
					</div>
					<Button onClick={handleConvert}>
						Convert and Download
					</Button>

				</div>
			</div >

		</>
	);
};

export default FilesConvertor;
