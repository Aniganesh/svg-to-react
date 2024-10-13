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

export interface TemplateOptions {
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
};`;
const namedExportJS = `export const %name% = (props) => {
	return %componentContent%;
};`;

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
      (setToUse as (typeof groupedByLanguage)["ts"]).interfaceWithoutExtend,
    );
  }

  template.push(setToUse.namedExport);

  if (options.addDefaultExport) {
    template.push(setToUse.defaultExport);
  }

  return template.join("\n\n");
};

const attributesWithHyphen = allSVGAttributes.filter((attribute) =>
  attribute.includes("-"),
);

export const convertSvgToReact = (
  svgContent: string,
  name: string,
  templateOptions: TemplateOptions = defaultTemplateOptions,
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
  let fileContent = getReactTemplate(templateOptions).replace(
    /%name%/g,
    toStartCase(name),
  );
  fileContent = fileContent.replace(/%componentContent%/g, svgContent);
  fileContent = fileContent.replace(XMLDeclarationRegex, "");
  fileContent = fileContent.replace(HTMLCommentRegex, "");
  fileContent = fileContent.replace(/return\s*\n/g, "return");
  return fileContent;
};
