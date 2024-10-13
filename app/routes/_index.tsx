import { type MetaFunction } from "@remix-run/node";
import { convertSvgToReact, TemplateOptions } from "../script";
import { CodeEditor } from "~/components/CodeEditor";
import { useEffect, useRef, useState } from "react";
import Header from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import { ClipboardCopy, Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DeepPartial } from "~/util-types";
import { TemplateCustomizer } from "~/components/TemplateCustomiser";

export const meta: MetaFunction = () => {
  return [
    { title: "SVG to React" },
    { name: "SVG to React", content: "Convert your svg files to react components" },
  ];
};

export default function Index() {
  const [js, setJs] = useState("");
  const lastXMLValueRef = useRef<string>("");
  const componentNameRef = useRef<string>("MyIcon");
  const [conversionOptions, setConversionOptions] = useState<DeepPartial<TemplateOptions>>({
    addDefaultExport: true,
    language: "ts",
    interfaceExtend: undefined,
  });

  const handleXmlChange = (value?: string) => {
    if (value) {
      lastXMLValueRef.current = value;
    }
    if (lastXMLValueRef.current)
      setJs(convertSvgToReact(lastXMLValueRef.current, componentNameRef.current, conversionOptions));
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Sidebar />
        <main className="flex-grow p-4">
          <TemplateCustomizer
            conversionOptions={conversionOptions}
            setConversionOptions={setConversionOptions}
            componentNameRef={componentNameRef}
            handleComponentNameChange={handleComponentNameChange}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <CodeEditor onChange={handleXmlChange} type="xml" />
            <div className="relative flex-1">
              <div className="absolute right-2 top-2 z-10 flex gap-2">
                <Button className="shadow-xl shadow-slate-700/50" onClick={copyJS}><ClipboardCopy size={18} /></Button>
                <Button className="shadow-xl shadow-slate-700/50" onClick={downloadJS}><Download size={18} /></Button>
              </div>
              <CodeEditor value={js} onChange={setJs} type="js" editable={false} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
