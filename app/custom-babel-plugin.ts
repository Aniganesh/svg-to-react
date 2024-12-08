import { NodePath, PluginObj, types as t } from '@babel/core';

interface BabelPluginOptions {
  replaceValues?: Array<{
    oldValue: string;
    newValue: string;
  }>;
}

export default function customBabelPlugin(): PluginObj {
  return {
    name: 'custom-svg-value-replacer',
    visitor: {
      JSXAttribute(path: NodePath<t.JSXAttribute>, state: { opts: BabelPluginOptions }) {
        const { replaceValues = [] } = state.opts;

        if (t.isJSXAttribute(path.node) && t.isStringLiteral(path.node.value)) {
          const value = path.node.value.value;
          
          replaceValues.forEach(({ oldValue, newValue }) => {
            if (value === oldValue) {
              path.node.value = t.jsxExpressionContainer(t.identifier(newValue));
            }
          });
        }
      },
      StringLiteral(path: NodePath<t.StringLiteral>, state: { opts: BabelPluginOptions }) {
        const { replaceValues = [] } = state.opts;

        if (path.parentPath.isJSXAttribute()) {
          const value = path.node.value;
          
          replaceValues.forEach(({ oldValue, newValue }) => {
            if (value === oldValue) {
              path.replaceWith(t.jsxExpressionContainer(t.identifier(newValue)));
            }
          });
        }
      }
    }
  };
}
