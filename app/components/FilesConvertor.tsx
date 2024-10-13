import React, { useState } from "react";
import { BlobReader, ZipReader, TextWriter, BlobWriter, ZipWriter, TextReader } from "@zip.js/zip.js";
import { convertSvgToReact, TemplateOptions, toStartCase } from "../script";
import { Button } from "~/components/ui/button";
import { TemplateCustomizer } from "./TemplateCustomiser";
import { DeepPartial } from "~/util-types";

interface FilesConvertorProps { }

export const FilesConvertor: React.FC<FilesConvertorProps> = () => {
	const [conversionOptions, setConversionOptions] = useState<DeepPartial<TemplateOptions>>({
		addDefaultExport: true,
		language: "ts",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const file = (formData.get("file") as File | null);
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
				const svgContent = convertSvgToReact(content, componentName, conversionOptions as TemplateOptions);
				return { content: svgContent, name: componentName };
			}));

			const zipFileWriter = new BlobWriter();
			const zipWriter = new ZipWriter(zipFileWriter);

			res.filter((v) => !!v).forEach((file) =>
				zipWriter.add(`${file.name}.${conversionOptions.language === "ts" ? "tsx" : "jsx"}`, new TextReader(file.content))
			);

			const url = URL.createObjectURL(await zipWriter.close());
			const downloadLink = document.createElement("a");
			downloadLink.href = url;
			downloadLink.download = `react-components.zip`;
			downloadLink.click();
			return;
		}
		const fileContent = await file.text();
		const componentName = toStartCase(file.name.replace(/\.[^/.]+$/, ""));
		const svgContent = convertSvgToReact(fileContent, componentName, conversionOptions as TemplateOptions);
		const blob = new Blob([svgContent], { type: "text/plain", });
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = `${componentName}.${conversionOptions.language === "ts" ? "tsx" : "jsx"}`;
		downloadLink.click();
	};

	return (
		<>
			<div className="flex justify-center">
				<TemplateCustomizer
					conversionOptions={conversionOptions}
					setConversionOptions={setConversionOptions}
				/>
			</div>
			<div className="flex items-center justify-center min-h-full border-dashed border-2 border-gray-600 rounded-lg">
				<div className="w-full max-w-3xl space-y-8">
					<form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center">
						<div>
							<label htmlFor="file" className="block text-sm font-medium text-gray-300 text-center">
								Upload SVG or ZIP file
							</label>
							<input
								title=" "
								type="file"
								name="file"
								id="file"
								accept="image/svg+xml, application/zip"
								multiple
								className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
							/>
						</div>
						<Button type="submit">
							Convert and Download
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default FilesConvertor;
