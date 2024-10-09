import { type MetaFunction } from "@remix-run/node";
import { convertSvgToReact } from "../script";
import { BlobReader, ZipReader, TextWriter, BlobWriter, ZipWriter, TextReader } from "@zip.js/zip.js";
import { CodeEditor } from "~/components/CodeEditor";

export const meta: MetaFunction = () => {
  return [
    { title: "SVG to React" },
    { name: "SVG to React", content: "Convert your svg files to react components" },
  ];
};

export default function Index() {

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

  return (
    <div className="h-screen items-center justify-center">
      <div className="flex flex-row gap-4">
        <CodeEditor value="" type="xml" />
        <CodeEditor value="" type="js" />
      </div>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" id="file" accept="image/svg, application/zip" multiple />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
