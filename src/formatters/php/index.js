import { formatHtml } from '../html/index.js';
import {
  maskProtectedSyntax,
  restoreProtectedSyntax,
} from '../../parsers/languageTokenizer.js';

function isMostlyPhp(source) {
  const trimmed = source.trim();
  return trimmed.startsWith('<?php') || trimmed.startsWith('<?=');
}

function phpLooksUnsafeToRewrite(source) {
  return /<<<|'|"|`|\$\{?/.test(source);
}

export async function formatPhp(source, options = {}) {
  const { masked, regions } = maskProtectedSyntax(source);

  if (isMostlyPhp(source) && regions.length === 1 && regions[0].value.trim() === source.trim()) {
    if (phpLooksUnsafeToRewrite(source)) {
      return source.endsWith('\n') ? source : `${source}\n`;
    }
  }

  if (!masked.trim()) {
    return source;
  }

  const formattedHtml = formatHtml(masked, options);
  return restoreProtectedSyntax(formattedHtml, regions);
}

export async function formatWordpress(source, options = {}) {
  return formatPhp(source, options);
}
