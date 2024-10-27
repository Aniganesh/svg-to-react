import { type MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Header from "~/components/Header";
import { Mode, Sidebar } from "~/components/Sidebar";
import { CodeConvertor } from "~/components/CodeConvertor";
import { FilesConvertor } from "~/components/FilesConvertor";

export const meta: MetaFunction = () => {
  return [
    { title: "SVG to React" },
    { name: "SVG to React", content: "Convert your svg files to react components" },
  ];
};

export default function Index() {
  const [mode, setMode] = useState<Mode>('code');
  return (<>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex h-[calc(100vh_-_64px)]">
        <Sidebar onModeChange={setMode} mode={mode} />
        <main className="flex-1 p-4">
          {mode === 'code' ? <CodeConvertor /> : <FilesConvertor />}
        </main>
      </div>
    </div>
  </>
  );
}
