import { formatHtml } from '../html/index.js';

export function formatXml(source, options = {}) {
  return formatHtml(source, { ...options, xmlMode: true });
}
