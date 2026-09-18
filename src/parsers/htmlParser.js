import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';

export const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

export const WHITESPACE_SENSITIVE_TAGS = new Set([
  'pre',
  'textarea',
  'script',
  'style',
  'code',
  'samp',
  'kbd',
]);

export function parseHtml(source, { xmlMode = false } = {}) {
  let parseError = null;
  const handler = new DomHandler((error) => {
    if (error) {
      parseError = error;
    }
  });

  const parser = new Parser(handler, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
    recognizeSelfClosing: true,
    xmlMode,
  });

  parser.write(source);
  parser.end();

  return { nodes: handler.dom, error: parseError };
}

export function getTagName(node) {
  return String(node.name || '').toLowerCase();
}
