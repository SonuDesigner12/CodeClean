import {
  parseHtml,
  VOID_ELEMENTS,
  WHITESPACE_SENSITIVE_TAGS,
  getTagName,
} from '../../parsers/htmlParser.js';
import {
  collapseWhitespace,
  indentString,
  isOnlyWhitespace,
} from '../../utils/whitespace.js';

const INLINE_TAGS = new Set([
  'a',
  'abbr',
  'b',
  'bdo',
  'br',
  'cite',
  'data',
  'dfn',
  'em',
  'i',
  'img',
  'kbd',
  'label',
  'mark',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
  'wbr',
  'button',
  'input',
  'select',
  'textarea',
  'code',
]);

function quoteAttribute(value) {
  const text = String(value ?? '');
  if (text.includes('"') && !text.includes("'")) {
    return `'${text}'`;
  }
  return `"${text}"`;
}

function serializeAttributes(attribs) {
  if (!attribs) {
    return '';
  }
  return Object.entries(attribs)
    .map(([name, value]) => {
      if (value == null) {
        return ` ${name}`;
      }
      return ` ${name}=${quoteAttribute(value)}`;
    })
    .join('');
}

function isElement(node) {
  return node.type === 'tag' || node.type === 'script' || node.type === 'style';
}

function hasElementChildren(nodes = []) {
  return nodes.some((node) => isElement(node));
}

function shouldKeepRawText(tagName) {
  return WHITESPACE_SENSITIVE_TAGS.has(tagName);
}

function serializeText(text, { collapse }) {
  if (collapse) {
    return collapseWhitespace(text);
  }
  return text;
}

function serializeChildren(nodes, context) {
  const { indentUnit, depth, collapseText } = context;
  const indent = indentUnit.repeat(depth);
  const childIndent = indentUnit.repeat(depth + 1);
  const parts = [];

  for (const node of nodes || []) {
    if (node.type === 'text') {
      if (collapseText && isOnlyWhitespace(node.data)) {
        continue;
      }
      const value = serializeText(node.data, { collapse: collapseText });
      if (!value) {
        continue;
      }
      if (collapseText) {
        parts.push(value);
      } else {
        parts.push(node.data);
      }
      continue;
    }

    if (node.type === 'comment') {
      parts.push({
        block: true,
        value: `${childIndent}<!--${node.data}-->`,
      });
      continue;
    }

    if (node.type === 'directive') {
      parts.push({
        block: true,
        value: `${indent}<${node.data}>`,
      });
      continue;
    }

    if (isElement(node)) {
      parts.push({
        block: true,
        node,
      });
    }
  }

  return parts;
}

function serializeElement(node, context) {
  const tagName = node.name;
  const lower = getTagName(node);
  const attrs = serializeAttributes(node.attribs);
  const indent = context.indentUnit.repeat(context.depth);
  const open = `<${tagName}${attrs}>`;
  const close = `</${tagName}>`;

  if (VOID_ELEMENTS.has(lower) && !context.xmlMode) {
    return `${indent}${open}`;
  }

  const raw = shouldKeepRawText(lower);
  const children = node.children || [];

  if (raw) {
    const inner = children
      .map((child) => {
        if (child.type === 'text') {
          return child.data;
        }
        if (child.type === 'comment') {
          return `<!--${child.data}-->`;
        }
        return serializeElement(child, {
          ...context,
          depth: 0,
          collapseText: false,
        });
      })
      .join('');
    return `${indent}${open}${inner}${close}`;
  }

  if (!hasElementChildren(children)) {
    const text = collapseWhitespace(
      children
        .filter((child) => child.type === 'text')
        .map((child) => child.data)
        .join(''),
    );
    const comments = children
      .filter((child) => child.type === 'comment')
      .map((child) => `<!--${child.data}-->`)
      .join('');
    return `${indent}${open}${text}${comments}${close}`;
  }

  const onlyInline = children
    .filter((child) => isElement(child) || (child.type === 'text' && !isOnlyWhitespace(child.data)))
    .every((child) => {
      if (child.type === 'text') {
        return true;
      }
      return INLINE_TAGS.has(getTagName(child));
    });

  if (onlyInline) {
    const inner = children
      .map((child) => {
        if (child.type === 'text') {
          return collapseWhitespace(child.data);
        }
        if (child.type === 'comment') {
          return `<!--${child.data}-->`;
        }
        if (isElement(child)) {
          return serializeElement(child, {
            ...context,
            depth: 0,
            collapseText: true,
          }).trim();
        }
        return '';
      })
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    return `${indent}${open}${inner}${close}`;
  }

  const lines = [`${indent}${open}`];
  for (const child of children) {
    if (child.type === 'text') {
      if (isOnlyWhitespace(child.data)) {
        continue;
      }
      lines.push(
        `${context.indentUnit.repeat(context.depth + 1)}${collapseWhitespace(child.data)}`,
      );
      continue;
    }
    if (child.type === 'comment') {
      lines.push(`${context.indentUnit.repeat(context.depth + 1)}<!--${child.data}-->`);
      continue;
    }
    if (isElement(child)) {
      lines.push(
        serializeElement(child, {
          ...context,
          depth: context.depth + 1,
        }),
      );
    }
  }
  lines.push(`${indent}${close}`);
  return lines.join('\n');
}

export function formatHtml(source, options = {}) {
  const xmlMode = Boolean(options.xmlMode);
  const { nodes, error } = parseHtml(source, { xmlMode });
  if (error) {
    throw new Error(`HTML parse error: ${error.message || error}`);
  }

  const indentUnit = indentString(options.tabWidth ?? 2, options.useTabs);
  const context = {
    indentUnit,
    depth: 0,
    collapseText: true,
    xmlMode,
  };

  const output = nodes
    .map((node) => {
      if (node.type === 'directive') {
        return `<${node.data}>`;
      }
      if (node.type === 'comment') {
        return `<!--${node.data}-->`;
      }
      if (node.type === 'text') {
        if (isOnlyWhitespace(node.data)) {
          return '';
        }
        return collapseWhitespace(node.data);
      }
      if (isElement(node)) {
        return serializeElement(node, context);
      }
      return '';
    })
    .filter((line) => line !== '')
    .join('\n');

  return `${output.trim()}\n`;
}
