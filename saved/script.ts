import allSVGAttributes from "./allSVGAttributes.json";

function toStartCase(str: string) {
  const words = str.split("-");
  const res: string[] = [];
  words.forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, "");
    res.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return res.join("");
}

function toCamelCase(str: string) {
  const words = str.split("-");
  const res: string[] = [];
  words.slice(1).forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, "");
    res.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return [words[0]].concat(res).join("");
}

interface TemplateOptions {
  addDefaultExport?: boolean;
  language: "ts" | "js";
}

const defaultTemplateOptions: TemplateOptions = {
  addDefaultExport: true,
  language: "ts",
};

const reactTSImport = "import React, { FC } from 'react';";
const reactJSImport = "import React from 'react';";

const reactTSInterfaceWithoutExtend = "interface %name%Props { }";
// TODO: Add support for using interface with extend
const reactTSInterfaceWithExtend = "interface %name%Props extends %extend% {}";

const defaultExport = "export default %name%;";

const namedExportTS = `export const %name%: FC<%name%Props> = (props) => {
	return %componentContent%;
};
`;
const namedExportJS = `export const %name% = (props) => {
	return %componentContent%;
};
`;

const groupedByLanguage = {
  js: {
    import: reactJSImport,
    namedExport: namedExportJS,
    defaultExport,
  } as const,
  ts: {
    import: reactTSImport,
    namedExport: namedExportTS,
    interfaceWithoutExtend: reactTSInterfaceWithoutExtend,
    interfaceWithExtend: reactTSInterfaceWithExtend,
    defaultExport,
  } as const,
} as const;

const XMLDeclarationRegex = /<\?xml\s+.*\?>/;
const HTMLCommentRegex = /<!--[\s\S]*?-->/;

const getReactTemplate = (options: TemplateOptions) => {
  const template: string[] = [];
  const setToUse = groupedByLanguage[options.language];

  template.push(setToUse.import);

  if (options.language === "ts") {
    template.push(
      (setToUse as (typeof groupedByLanguage)["ts"]).interfaceWithoutExtend
    );
  }

  template.push(setToUse.namedExport);

  if (options.addDefaultExport) {
    template.push(setToUse.defaultExport);
  }

  return template.join("\n");
};

const attributesWithHyphen = allSVGAttributes.filter((attribute) =>
  attribute.includes("-")
);

export const convertSvgToReact = (
  svgContent: string,
  name: string,
  templateOptions: TemplateOptions = defaultTemplateOptions
) => {
  // replace each of the disallowed attributes with their camelcase equivalents.
  attributesWithHyphen.forEach((attribute) => {
    if (svgContent.includes(attribute)) {
      svgContent = svgContent.replace(
        new RegExp(`${attribute}=`, "g"),
        toCamelCase(attribute) + "="
      );
    }
  });
  let fileContent = getReactTemplate(templateOptions).replace(
    /%name%/g,
    toStartCase(name)
  );
  fileContent = fileContent.replace(/%componentContent%/g, svgContent);
  fileContent = fileContent.replace(XMLDeclarationRegex, "");
  fileContent = fileContent.replace(HTMLCommentRegex, "");
  fileContent = fileContent.replace(/return\s*\n/g, "return");
  return fileContent;
};
