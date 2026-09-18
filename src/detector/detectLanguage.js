const WORDPRESS_SIGNALS = [
  'wp_head',
  'wp_footer',
  'get_header',
  'get_footer',
  'the_content',
  'the_title',
  'add_action',
  'add_filter',
  'bloginfo',
  'have_posts',
  'the_post',
  'wp_enqueue_script',
];

const HTML_SIGNAL = /<\/?[a-zA-Z][\w:-]*(\s|>|\/)/;
const CSS_SIGNAL = /[{;]\s*[a-zA-Z-]+\s*:/;
const JS_SIGNAL =
  /\b(function|const|let|var|=>|import\s+|export\s+|console\.|document\.)\b/;
const PHP_SIGNAL = /<\?(php|=)?/i;
const LIQUID_SIGNAL = /\{\{|\{%/;
const XML_SIGNAL = /^\s*<\?xml\b/i;

function countMatches(source, pattern) {
  const matches = source.match(pattern);
  return matches ? matches.length : 0;
}

export function detectLanguage(source) {
  const text = String(source || '');
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      id: 'html',
      label: 'HTML',
      confidence: 'low',
      uncertain: true,
      reason: 'Empty input',
    };
  }

  const hasPhp = PHP_SIGNAL.test(trimmed);
  const hasLiquid = LIQUID_SIGNAL.test(trimmed);
  const wordpressHits = WORDPRESS_SIGNALS.filter((token) => trimmed.includes(token)).length;

  if (hasPhp && wordpressHits >= 1) {
    return {
      id: 'wordpress',
      label: 'WordPress',
      confidence: 'high',
      uncertain: false,
      reason: 'PHP tags plus WordPress APIs',
    };
  }

  if (hasPhp) {
    return {
      id: 'php',
      label: 'PHP',
      confidence: 'high',
      uncertain: false,
      reason: 'PHP opening tag',
    };
  }

  if (hasLiquid) {
    return {
      id: 'liquid',
      label: 'Shopify Liquid',
      confidence: 'high',
      uncertain: false,
      reason: 'Liquid template tags',
    };
  }

  if (XML_SIGNAL.test(trimmed) || /xmlns=/.test(trimmed)) {
    return {
      id: 'xml',
      label: 'XML',
      confidence: XML_SIGNAL.test(trimmed) ? 'high' : 'medium',
      uncertain: !XML_SIGNAL.test(trimmed),
      reason: 'XML declaration or namespace',
    };
  }

  if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && !JS_SIGNAL.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return {
        id: 'json',
        label: 'JSON',
        confidence: 'high',
        uncertain: false,
        reason: 'Valid JSON document',
      };
    } catch {
      // Continue to other detectors. JSON.parse is data parsing only, never execution.
    }
  }

  const htmlHits = countMatches(trimmed, /<\/?[a-zA-Z][\w:-]*\b/g);
  const cssHits = countMatches(trimmed, /[a-zA-Z-]+\s*:\s*[^;{}]+;/g);
  const jsHits = countMatches(
    trimmed,
    /\b(function|const|let|var|=>|import|export)\b/g,
  );

  if (htmlHits >= 2 && htmlHits >= cssHits && htmlHits >= jsHits) {
    return {
      id: 'html',
      label: 'HTML',
      confidence: htmlHits >= 3 ? 'high' : 'medium',
      uncertain: htmlHits < 2,
      reason: 'HTML tags',
    };
  }

  if (cssHits >= 2 && trimmed.includes('{') && !JS_SIGNAL.test(trimmed) && !HTML_SIGNAL.test(trimmed)) {
    return {
      id: 'css',
      label: 'CSS',
      confidence: 'high',
      uncertain: false,
      reason: 'CSS declarations',
    };
  }

  if (jsHits >= 1 || JS_SIGNAL.test(trimmed)) {
    return {
      id: 'javascript',
      label: 'JavaScript',
      confidence: jsHits >= 2 ? 'high' : 'medium',
      uncertain: jsHits < 1,
      reason: 'JavaScript syntax',
    };
  }

  if (HTML_SIGNAL.test(trimmed)) {
    return {
      id: 'html',
      label: 'HTML',
      confidence: 'medium',
      uncertain: true,
      reason: 'Looks like markup',
    };
  }

  if (CSS_SIGNAL.test(trimmed)) {
    return {
      id: 'css',
      label: 'CSS',
      confidence: 'medium',
      uncertain: true,
      reason: 'Looks like CSS',
    };
  }

  return {
    id: 'html',
    label: 'HTML',
    confidence: 'low',
    uncertain: true,
    reason: 'No strong language signal',
  };
}

export const LANGUAGE_OPTIONS = [
  { id: 'auto', label: 'Auto Detect' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'php', label: 'PHP' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'liquid', label: 'Shopify Liquid' },
  { id: 'json', label: 'JSON' },
  { id: 'xml', label: 'XML' },
];
