const WHITESPACE_RE = /[ \t\f\r\n]+/g;

export function collapseWhitespace(value) {
  return String(value).replace(WHITESPACE_RE, ' ').trim();
}

export function isOnlyWhitespace(value) {
  return String(value).trim() === '';
}

export function stripAllWhitespace(value) {
  return String(value).replace(/\s+/g, '');
}

export function normalizeNewlines(value) {
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

export function indentString(size, useTabs) {
  if (useTabs) {
    return '\t';
  }
  return ' '.repeat(Math.max(0, size));
}
