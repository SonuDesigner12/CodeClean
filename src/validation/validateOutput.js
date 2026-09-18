import { collectProtectedValues } from '../parsers/languageTokenizer.js';
import { stripAllWhitespace } from '../utils/whitespace.js';

const URL_RE = /https?:\/\/[^\s"'<>]+/gi;
const SHORTCODE_RE = /\[[a-zA-Z][\w-]*(?:\s[^\]]*)?\]/g;

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function extractUrls(source) {
  return unique(source.match(URL_RE) || []);
}

export function extractShortcodes(source) {
  return unique(source.match(SHORTCODE_RE) || []);
}

function missingItems(originalItems, output) {
  return originalItems.filter((item) => !output.includes(item));
}

export function validateOutput(original, output, languageId, extra = {}) {
  if (original.trim() && (output == null || String(output).trim() === '')) {
    return {
      ok: false,
      code: 'validation_error',
      message: 'Formatting produced empty output. Original code was preserved.',
    };
  }

  const urls = extractUrls(original);
  const lostUrls = missingItems(urls, output);
  if (lostUrls.length) {
    return {
      ok: false,
      code: 'validation_error',
      message: 'A URL was changed or removed during formatting. Original code was preserved.',
    };
  }

  const shortcodes = extractShortcodes(original);
  const lostShortcodes = missingItems(shortcodes, output);
  if (lostShortcodes.length) {
    return {
      ok: false,
      code: 'validation_error',
      message: 'A WordPress shortcode was altered. Original code was preserved.',
    };
  }

  const protectedValues = extra.protectedValues || collectProtectedValues(original);
  const lostProtected = missingItems(protectedValues, output);
  if (lostProtected.length) {
    return {
      ok: false,
      code: 'validation_error',
      message: 'A protected PHP or Liquid region was lost. Original code was preserved.',
    };
  }

  const originalCompact = stripAllWhitespace(original);
  const outputCompact = stripAllWhitespace(output);
  if (originalCompact.length > 40 && outputCompact.length < originalCompact.length * 0.5) {
    return {
      ok: false,
      code: 'validation_error',
      message: 'Formatting looked destructive. Original code was preserved.',
    };
  }

  if (languageId === 'php' || languageId === 'wordpress') {
    const originalOpen = (original.match(/<\?(php|=)?/gi) || []).length;
    const outputOpen = (output.match(/<\?(php|=)?/gi) || []).length;
    if (originalOpen !== outputOpen) {
      return {
        ok: false,
        code: 'validation_error',
        message: 'PHP tag count changed. Original code was preserved.',
      };
    }
  }

  if (languageId === 'liquid') {
    const originalTags = (original.match(/\{\{|\{\%/g) || []).length;
    const outputTags = (output.match(/\{\{|\{\%/g) || []).length;
    if (originalTags !== outputTags) {
      return {
        ok: false,
        code: 'validation_error',
        message: 'Liquid tag count changed. Original code was preserved.',
      };
    }
  }

  return { ok: true, code: 'success', message: 'Code optimized successfully.' };
}
