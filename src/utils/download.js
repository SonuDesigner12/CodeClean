const EXTENSIONS = {
  html: 'html',
  css: 'css',
  javascript: 'js',
  json: 'json',
  xml: 'xml',
  php: 'php',
  wordpress: 'php',
  liquid: 'liquid',
};

export function extensionForLanguage(languageId) {
  return EXTENSIONS[languageId] || 'txt';
}

export function downloadText(content, filename) {
  const blob = new Blob([content ?? ''], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadOptimizedCode(content, languageId) {
  downloadText(content, `optimized.${extensionForLanguage(languageId)}`);
}
