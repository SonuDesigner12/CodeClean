import { collectProtectedValues } from '../parsers/languageTokenizer.js';

export const PROTECTED_HTML_TAGS = ['pre', 'textarea', 'script', 'style'];

export function listProtectedRegions(source) {
  return collectProtectedValues(source);
}
