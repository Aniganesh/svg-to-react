import { type MetaFunction } from "@remix-run/node";
import { convertSvgToReact } from "../script";
import { CodeEditor } from "~/components/CodeEditor";
import { useRef, useState } from "react";
import Header from '../components/Header';

import Sidebar from "~/components/Sidebar";
import { ClipboardCopy } from "lucide-react";
import { Button } from "~/components/ui/button";

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
  const handleXmlChange = (value?: string) => {
    if (value) {
      lastXMLValueRef.current = value;
    }
    if (lastXMLValueRef.current)
      setJs(convertSvgToReact(lastXMLValueRef.current, componentNameRef.current));
  };

  const handleComponentNameChange = (value: string) => {
    componentNameRef.current = value;
    handleXmlChange();
  };
  const copyJS = () => {
    navigator.clipboard.writeText(js);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Sidebar />

        {/* Main content */}
        <main className="flex-grow p-4">
          <input
            type="text"
            defaultValue={componentNameRef.current}
            className="w-full mb-4 p-2 text-white outline-none bg-transparent border-b border-transparent focus:border-white"
            onChange={(e) => {
              handleComponentNameChange(e.target.value);
            }}
            placeholder="Enter component name"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <CodeEditor onChange={handleXmlChange} type="xml" />
            <div className="relative">
              <Button onClick={copyJS} ><ClipboardCopy /></Button>
              <CodeEditor value={js} onChange={setJs} type="js" editable={false} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
