import { DeepPartial } from "./util-types";
import prettier from "prettier/standalone";
import * as typescript from "prettier/plugins/typescript.js";
import * as estree from "prettier/plugins/estree";

const allSVGAttributes = [
  "accent-height",
  "accumulate",
  "additive",
  "alignment-baseline",
  "alphabetic",
  "amplitude",
  "arabic-form",
  "ascent",
  "attributeName",
  "attributeType",
  "azimuth",
  "baseFrequency",
  "baseline-shift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "cap-height",
  "class",
  "clip",
  "clipPathUnits",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-rendering",
  "crossorigin",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "end",
  "exponent",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterUnits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "format",
  "from",
  "fr",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "height",
  "href",
  "hreflang",
  "horiz-adv-x",
  "horiz-origin-x",
  "id",
  "ideographic",
  "image-rendering",
  "in",
  "in2",
  "intercept",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lang",
  "lengthAdjust",
  "letter-spacing",
  "lighting-color",
  "limitingConeAngle",
  "local",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "max",
  "media",
  "method",
  "min",
  "mode",
  "name",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overline-position",
  "overline-thickness",
  "panose-1",
  "paint-order",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "ping",
  "pointer-events",
  "points",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "referrerPolicy",
  "refX",
  "refY",
  "rel",
  "rendering-intent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "scale",
  "seed",
  "shape-rendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  "string",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "style",
  "surfaceScale",
  "systemLanguage",
  "tabindex",
  "tableValues",
  "target",
  "targetX",
  "targetY",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "textLength",
  "to",
  "transform",
  "transform-origin",
  "type",
  "u1",
  "u2",
  "underline-position",
  "underline-thickness",
  "unicode",
  "unicode-bidi",
  "unicode-range",
  "units-per-em",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "values",
  "vector-effect",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "viewBox",
  "visibility",
  "width",
  "widths",
  "word-spacing",
  "writing-mode",
  "x",
  "x-height",
  "x1",
  "x2",
  "xChannelSelector",
  "xlink:actuate",
  "xlink:arcrole",
  "xlink:href Deprecated",
  "xlink:role",
  "xlink:show",
  "xlink:title",
  "xlink:type",
  "xml:lang",
  "xml:space",
  "y",
  "y1",
  "y2",
  "yChannelSelector",
  "z",
  "zoomAndPan",
];
const allSVGElements = [
  "a",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "script",
  "set",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "title",
  "tspan",
  "use",
  "view",
  "cursor",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "glyph",
  "glyphRef",
  "hkern",
  "missing-glyph",
  "tref",
  "vkern",
];
const allSVGElementsRegexp = allSVGElements.map(
  (element) => new RegExp(`<${element}.*`),
);

const DEFAULT_LANGUAGE = "ts";
const TYPESCRIPT_KEY = "ts";

export function toStartCase(str: string) {
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

export interface TemplateOptions {
  addDefaultExport?: boolean;
  language: "ts" | "js";
  reactNative?: boolean;
  replaceValues?: {
    oldValue: string;
    newValue: string;
    addToInterface?: boolean;
    destructureFromProps?: boolean;
  }[];
  title?: string;
  description?: string;
  /*  TODO:
  Add support for:
  - ref
  - memo
  - title, description props
   */
  spreadProps?: "start" | "end";
  interfaceExtend?: {
    from?: string;
    name: string;
  };
}

const defaultTemplateOptions: TemplateOptions = {
  addDefaultExport: true,
  language: TYPESCRIPT_KEY,
};

const reactTSImport = "import React, { FC%otherImports% } from 'react';";
const reactJSImport = "import React from 'react';";
const reactNativeImport = "import { %rnSvgImports% } from 'react-native-svg';";

const reactTSImportExtendingInterface = `import { %extend% } from "%import%";`;

const reactTSInterfaceWithoutExtend = "interface %name%Props { }";
const reactTSInterfaceWithExtend = "interface %name%Props extends %extend% { }";

const defaultExport = "export default %name%;";

const namedExportReactTS = `export const %name%: FC<%name%Props> = (props) => {
	return %componentContent%;
};`;

const namedExportReactJS = `export const %name% = (props) => {
	return %componentContent%;
};`;

const groupedByLanguage = {
  js: {
    import: reactJSImport,
    namedExport: namedExportReactJS,
    reactNativeImport,
    defaultExport,
  } as const,
  ts: {
    import: reactTSImport,
    reactNativeImport,
    namedExport: namedExportReactTS,
    interfaceWithoutExtend: reactTSInterfaceWithoutExtend,
    interfaceWithExtend: reactTSInterfaceWithExtend,
    importExtendingInterface: reactTSImportExtendingInterface,
    defaultExport,
  } as const,
} as const;

const XMLDeclarationRegex = /<\?xml\s+.*\?>/;
const HTMLCommentRegex = /<!--[\s\S]*?-->/;

const getReactTemplate = (options: DeepPartial<TemplateOptions>) => {
  const template: string[] = [];
  const setToUse = groupedByLanguage[options.language ?? DEFAULT_LANGUAGE];

  template.push(setToUse.import);
  if (options.reactNative) {
    template.push(setToUse.reactNativeImport);
  }

  if (options.language === TYPESCRIPT_KEY) {
    if (
      options.interfaceExtend?.from &&
      options.interfaceExtend.from !== "react"
    ) {
      template.push(
        (setToUse as (typeof groupedByLanguage)["ts"]).importExtendingInterface,
      );
    }
    template.push(
      options.interfaceExtend?.name
        ? (setToUse as (typeof groupedByLanguage)["ts"]).interfaceWithExtend
        : (setToUse as (typeof groupedByLanguage)["ts"]).interfaceWithoutExtend,
    );
  }

  template.push(setToUse.namedExport);

  if (options.addDefaultExport) {
    template.push(setToUse.defaultExport);
  }

  return template.join("\n");
};

const attributesWithHyphen = allSVGAttributes.filter((attribute) =>
  attribute.includes("-"),
);

// We could define the template options as a bunch of rules and transformations to be applied to the file content and have a fsm that checks if the rule is applicable and applies it. The current version is a very loosely defined way to do it.

export const convertSvgToReact = async (
  svgContent: string,
  name: string,
  templateOptions: DeepPartial<TemplateOptions> = defaultTemplateOptions,
) => {
  // replace each of the disallowed attributes with their camelcase equivalents.
  attributesWithHyphen.forEach((attribute) => {
    if (svgContent.includes(attribute)) {
      svgContent = svgContent.replace(
        new RegExp(`${attribute}=`, "g"),
        toCamelCase(attribute) + "=",
      );
    }
  });
  if (templateOptions.title || templateOptions.description) {
    const titleRegex = /<title>(.*?)<\/title>/;
    const descriptionRegex = /<desc>(.*?)<\/desc>/;
    const svgOpenTagRegex = /<[sS]vg([^>]*)>/;

    let titleTag = "";
    let descTag = "";

    if (templateOptions.title) {
      titleTag = `<title>${templateOptions.title}</title>`;
    }

    if (templateOptions.description) {
      descTag = `<desc>${templateOptions.description}</desc>`;
    }

    const insertTags = titleTag + descTag;

    if (titleRegex.test(svgContent) && descriptionRegex.test(svgContent)) {
      svgContent = svgContent.replace(titleRegex, titleTag);
      svgContent = svgContent.replace(descriptionRegex, descTag);
    } else if (titleRegex.test(svgContent)) {
      svgContent = svgContent.replace(titleRegex, `${insertTags}`);
    } else if (descriptionRegex.test(svgContent)) {
      svgContent = svgContent.replace(descriptionRegex, `${insertTags}`);
    } else {
      svgContent = svgContent.replace(svgOpenTagRegex, `<svg$1>${insertTags}`);
    }
  }
  let fileContent = getReactTemplate(templateOptions);
  if (
    templateOptions.replaceValues &&
    templateOptions.replaceValues.length > 0
  ) {
    const propsToDestructure: string[] = [];
    const interfaceAdditions: string[] = [];

    templateOptions.replaceValues.forEach((item) => {
      if (!item) return;
      const { oldValue, newValue, addToInterface, destructureFromProps } = item;
      if (!oldValue || !newValue) return;
      const regex = new RegExp(`"${oldValue}"`, "g");
      svgContent = svgContent.replace(regex, `{${newValue}}`);

      if (addToInterface) {
        interfaceAdditions.push(`${newValue}: string;`);
      }

      if (destructureFromProps) {
        propsToDestructure.push(newValue);
      }
    });

    if (interfaceAdditions.length > 0) {
      const interfaceRegex = /interface %name%Props.*?\{.*?\}/s;
      const newInterface = fileContent
        .match(interfaceRegex)?.[0]
        .replace("}", `  ${interfaceAdditions.join("\n  ")}\n}`);
      if (newInterface) {
        fileContent = fileContent.replace(interfaceRegex, newInterface);
      }
    }

    if (propsToDestructure.length > 0) {
      const propsString = propsToDestructure.join(", ");
      fileContent = fileContent.replace(
        /export const %name%.*?\((props|)\).*?{/s,
        `export const %name%: FC<%name%Props> = ({ ${propsString}, ...props }) => {`,
      );
    }
  }

  fileContent = fileContent.replace(/%name%/g, toStartCase(name));
  fileContent = fileContent.replace(/%componentContent%/g, svgContent);

  if (templateOptions.reactNative) {
    const svgElementsUsed = allSVGElementsRegexp.reduce(
      (acc, curr, index) =>
        curr.test(fileContent) ? [...acc, allSVGElements[index]] : acc,
      [] as string[],
    );
    svgElementsUsed.forEach((element) => {
      fileContent = fileContent.replace(
        new RegExp(`<${element}`, "g"),
        `<${toStartCase(element)}`,
      );
      fileContent = fileContent.replace(
        new RegExp(`</${element}`, "g"),
        `</${toStartCase(element)}`,
      );
    });
    fileContent = fileContent.replace(
      /%rnSvgImports%/g,
      svgElementsUsed.map((element) => toStartCase(element)).join(", "),
    );
  }

  if (templateOptions.interfaceExtend?.name) {
    fileContent = fileContent.replace(
      /%extend%/g,
      templateOptions.interfaceExtend.name,
    );
  }

  if (templateOptions.interfaceExtend?.from) {
    if (
      templateOptions.interfaceExtend.from === "react" &&
      templateOptions.interfaceExtend.name
    ) {
      fileContent = fileContent.replace(/%import%/g, "");
      fileContent = fileContent.replace(
        /%otherImports%/g,
        `,${templateOptions.interfaceExtend.name}`,
      );
    } else {
      fileContent = fileContent.replace(
        /%import%/g,
        templateOptions.interfaceExtend.from,
      );
      fileContent = fileContent.replace(/%otherImports%/g, "");
    }
  } else {
    fileContent = fileContent.replace(/%otherImports%/g, "");
  }

  switch (templateOptions.spreadProps) {
    case "start":
      fileContent = fileContent?.replace(/(<[sS]vg)(.*?>)/g, (match, p1, p2) => `${p1} {...props}${p2}`);
      break;
    case "end":
      fileContent = fileContent?.replace(/(<[sS]vg)(.*?>)/g, (match, p1, p2) => `${p1}${p2.slice(0, -1)} {...props}>`);
      break;
    default:
      break;
  }

  fileContent = fileContent.replace(XMLDeclarationRegex, "");
  fileContent = fileContent.replace(HTMLCommentRegex, "");
  fileContent = fileContent.replace(/return\s*\n/g, "return ");

  return prettier.format(fileContent, {
    parser: "typescript",
    plugins: [typescript, estree],
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    jsxSingleQuote: false,
    bracketSpacing: true,
    arrowParens: "always",
  });
};
