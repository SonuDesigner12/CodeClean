import { extractProtectedSyntax } from './languageTokenizer.js';

export function splitTemplateSegments(source) {
  return extractProtectedSyntax(source);
}

export function hasTemplateSyntax(source) {
  const { regions } = extractProtectedSyntax(source);
  return regions.length > 0;
}
