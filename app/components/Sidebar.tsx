import React, { FC } from 'react';
import { BlobReader, ZipReader, TextWriter, BlobWriter, ZipWriter, TextReader } from "@zip.js/zip.js";
import { convertSvgToReact } from "../script";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ArchiveIcon } from "lucide-react";

interface SidebarProps { }



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
		const res = await Promise.all(files.map(async (file, index) => {
			if (!file.getData) return '';
			console.log(file.filename);
			const textContentWriter = new TextWriter();
			const content = await file.getData(textContentWriter);
			const svgContent = convertSvgToReact(content, "Test" + index);
			return svgContent;
		}));

		const zipFileWriter = new BlobWriter();
		const zipWriter = new ZipWriter(zipFileWriter);

		Array.from(res.values()).filter((v) => !!v).map((fileContent) => zipWriter.add("Test.tsx", new TextReader(fileContent)));

		const url = URL.createObjectURL(await zipWriter.close());
		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = "Test.zip";
		downloadLink.click();
		return;
	}
	const fileContent = await file.text();
	const svgContent = convertSvgToReact(fileContent, "Test");
	const blob = new Blob([svgContent], { type: "text/plain", });
	const url = URL.createObjectURL(blob);
	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = "Test.tsx";
	downloadLink.click();
};

export const Sidebar: FC<SidebarProps> = () => {
	return <aside className="w-16 bg-gray-900 text-white p-4">
		<nav>
			<ul>
				<li className="mb-4">
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="ghost" size="icon" className="hover:bg-gray-700">
								<ArchiveIcon className="h-5 w-5" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 bg-gray-800 border-none">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label htmlFor="file" className="block text-sm font-medium text-gray-300">
										Upload SVG or ZIP file
									</label>
									<input
										type="file"
										name="file"
										id="file"
										accept="image/svg, application/zip"
										multiple
										className="mt-1 block w-full text-sm text-gray-300
                                     file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                     file:bg-blue-500 file:text-white
                                     hover:file:bg-blue-600"
									/>
								</div>
								<Button type="submit" className="w-full">
									Submit
								</Button>
							</form>
						</PopoverContent>
					</Popover>
				</li>
			</ul>
		</nav>
	</aside>;
};

export default Sidebar;