import { formatHtml } from '../html/index.js';
import {
  maskProtectedSyntax,
  restoreProtectedSyntax,
} from '../../parsers/languageTokenizer.js';

export async function formatLiquid(source, options = {}) {
  const { masked, regions } = maskProtectedSyntax(source);
  if (!masked.trim() && regions.length) {
    return source.endsWith('\n') ? source : `${source}\n`;
  }
  const formattedHtml = formatHtml(masked, options);
  return restoreProtectedSyntax(formattedHtml, regions);
}
