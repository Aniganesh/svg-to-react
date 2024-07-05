import fs from "fs";
import * as prettier from "prettier";

function toStartCase(str) {
  const words = str.split("-");
  const res = [];
  words.forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, "");
    res.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return res.join("");
}

function toCamelCase(str) {
  const words = str.split("-");
  const res = [];
  words.slice(1).forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, "");
    res.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return [words[0]].concat(res).join("");
}

const content = `import React, { FC } from 'react';

interface %name%Props { }

export const %name%: FC<%name%Props> = (props) => {
	return %componentContent%;
};

export default %name%;`;

const attributesWithHyphen = [
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
].filter((attribute) => attribute.includes("-"));

// Crawl each file path and convert the svg content to react component using the template above.
export const convertSvgToReact = (inputFolder) => {
  const files = fs.readdirSync(inputFolder);

  const contents = files.map(async (file) => {
    const nameWithExtension = file.split("/").at(-1);
    const name = nameWithExtension.split(".").at(0);
    let svgContent = fs.readFileSync(`./files/${nameWithExtension}`, "utf-8");

    // replace each of the disallowed attributes with their react equivalents.
    attributesWithHyphen.forEach((attribute) => {
      if (svgContent.includes(attribute)) {
        svgContent = svgContent.replace(
          new RegExp(`${attribute}=`, "g"),
          toCamelCase(attribute) + "="
        );
      }
    });
    let fileContent = content.replace(/%name%/g, toStartCase(name));
    fileContent = fileContent.replace(/%componentContent%/g, svgContent);
    fileContent = await prettier.format(fileContent, {
      parser: "typescript",
    });

    return { [`${toStartCase(name)}.tsx`]: fileContent };
  });
  return contents;
};
