import { type MetaFunction } from "@remix-run/node";
import { convertSvgToReact, TemplateOptions } from "../script";
import { CodeEditor } from "~/components/CodeEditor";
import { useEffect, useRef, useState } from "react";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";
import { ClipboardCopy, Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Toggle } from "~/components/ui/toggle";

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
  const [conversionOptions, setConversionOptions] = useState<TemplateOptions>({
    addDefaultExport: true,
    language: "ts",
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
  }, [conversionOptions, handleXmlChange]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Sidebar />
        <main className="flex-grow p-4">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              defaultValue={componentNameRef.current}
              className="flex-grow p-2 text-white outline-none bg-transparent border-b border-transparent focus:border-white flex-1"
              onChange={(e) => {
                handleComponentNameChange(e.target.value);
              }}
              placeholder="Enter component name"
            />
            <div className="flex items-center space-x-4 flex-1">
              <Toggle
                highlightStyles={(value) => ({
                  backgroundColor: value === "ts" ? "#3178c6" :
                    "#989821",
                  borderRadius: 2,
                })}
                options={[
                  { icon: <TsIcon />, value: "ts" },
                  { icon: <JsIcon />, value: "js" },
                ]}
                value={conversionOptions.language}
                onChange={(value) => {
                  setConversionOptions(prev => ({ ...prev, language: value as TemplateOptions["language"] }));
                }} />
              <div className="flex items-center space-x-2">
                <Switch
                  id="default-export"
                  checked={conversionOptions.addDefaultExport}
                  onCheckedChange={(checked: boolean) => {
                    setConversionOptions(prev => ({ ...prev, addDefaultExport: checked }));
                  }}
                />
                <Label htmlFor="default-export" className="text-sm text-gray-300">Default Export</Label>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <CodeEditor onChange={handleXmlChange} type="xml" />
            <div className="relative flex-1">
              <div className="absolute right-0 top-0 z-10 flex gap-2">
                <Button onClick={copyJS}><ClipboardCopy size={18} /></Button>
                <Button onClick={downloadJS}><Download size={18} /></Button>
              </div>
              <CodeEditor value={js} onChange={setJs} type="js" editable={false} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const TsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Ts</div>;
const JsIcon = () => <div className="size-8 flex items-end justify-end pr-1 text-xl text-right text-white rounded-sm">Js</div>;