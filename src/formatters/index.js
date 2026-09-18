import { detectLanguage } from '../detector/detectLanguage.js';
import { formatHtml } from './html/index.js';
import { formatCss } from './css/index.js';
import { formatJavaScript, formatJson } from './javascript/index.js';
import { formatPhp, formatWordpress } from './php/index.js';
import { formatLiquid } from './liquid/index.js';
import { formatXml } from './xml/index.js';
import { validateOutput } from '../validation/validateOutput.js';
import { collectProtectedValues } from '../parsers/languageTokenizer.js';
import { hasTemplateSyntax } from '../parsers/templateParser.js';

export const STATUS = {
  idle: 'idle',
  optimizing: 'optimizing',
  success: 'success',
  warning: 'warning',
  parse_error: 'parse_error',
  formatting_error: 'formatting_error',
  validation_error: 'validation_error',
};

async function formatByLanguage(source, languageId, options) {
  switch (languageId) {
    case 'css':
      return formatCss(source, options);
    case 'javascript':
      if (hasTemplateSyntax(source)) {
        return formatHtml(source, options);
      }
      return formatJavaScript(source, options);
    case 'json':
      return formatJson(source, options);
    case 'xml':
      return formatXml(source, options);
    case 'php':
      return formatPhp(source, options);
    case 'wordpress':
      return formatWordpress(source, options);
    case 'liquid':
      return formatLiquid(source, options);
    case 'html':
    default:
      return formatHtml(source, options);
  }
}

function classifyError(error) {
  const message = error?.message || String(error);
  if (/parse/i.test(message)) {
    return { code: STATUS.parse_error, message };
  }
  return { code: STATUS.formatting_error, message };
}

export async function optimizeCode(source, userOptions = {}) {
  const original = String(source ?? '');
  const options = {
    tabWidth: userOptions.tabWidth ?? 2,
    useTabs: userOptions.indentStyle === 'tab',
    preserveComments: userOptions.preserveComments !== false,
    printWidth: userOptions.printWidth ?? 80,
  };

  if (!original.trim()) {
    return {
      status: STATUS.warning,
      output: original,
      original,
      language: { id: 'html', label: 'HTML', uncertain: true },
      message: 'Paste some code before optimizing.',
    };
  }

  const selected = userOptions.language || 'auto';
  const detected = detectLanguage(original);
  const language = selected === 'auto' ? detected : { ...detected, id: selected, uncertain: false };

  if (selected === 'auto' && detected.uncertain && detected.confidence === 'low') {
    return {
      status: STATUS.warning,
      output: original,
      original,
      language: detected,
      message:
        'Language detection was uncertain, so the original code was left unchanged. Choose a language to continue.',
    };
  }

  try {
    const formatted = await formatByLanguage(original, language.id, options);
    const protectedValues = collectProtectedValues(original);
    const validation = validateOutput(original, formatted, language.id, {
      protectedValues,
    });

    if (!validation.ok) {
      return {
        status: STATUS.validation_error,
        output: original,
        original,
        language,
        message: validation.message,
      };
    }

    return {
      status: STATUS.success,
      output: formatted,
      original,
      language,
      message:
        selected === 'auto'
          ? `Optimized as ${language.label}.`
          : `Optimized as ${language.label}.`,
    };
  } catch (error) {
    const classified = classifyError(error);
    return {
      status: classified.code,
      output: original,
      original,
      language,
      message: `${classified.message} Original code was preserved.`,
    };
  }
}
