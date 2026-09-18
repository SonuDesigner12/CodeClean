function isPhpStart(source, index) {
  if (source[index] !== '<' || source[index + 1] !== '?') {
    return 0;
  }
  if (source.startsWith('<?php', index)) {
    return 5;
  }
  if (source.startsWith('<?=', index)) {
    return 3;
  }
  return 2;
}

function scanPhpString(source, start, quote) {
  let i = start + 1;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch === quote) {
      return i + 1;
    }
    i += 1;
  }
  return source.length;
}

function scanPhpHeredoc(source, start) {
  const match = source.slice(start).match(/^<<<(-)?([A-Za-z_][A-Za-z0-9_]*)\r?\n/);
  if (!match) {
    return start + 3;
  }
  const endToken = match[2];
  const bodyStart = start + match[0].length;
  const closer = new RegExp(`(?:^|\\n)${endToken};?(?=\\n|$)`);
  const rest = source.slice(bodyStart);
  const found = rest.search(closer);
  if (found === -1) {
    return source.length;
  }
  const closeMatch = rest.slice(found).match(closer);
  return bodyStart + found + closeMatch[0].length;
}

function findPhpEnd(source, from) {
  let i = from;
  while (i < source.length) {
    const ch = source[i];
    if (ch === "'" || ch === '"') {
      i = scanPhpString(source, i, ch);
      continue;
    }
    if (source.startsWith('<<<', i)) {
      i = scanPhpHeredoc(source, i);
      continue;
    }
    if (source.startsWith('//', i) || source.startsWith('#', i)) {
      const nl = source.indexOf('\n', i);
      i = nl === -1 ? source.length : nl + 1;
      continue;
    }
    if (source.startsWith('/*', i)) {
      const end = source.indexOf('*/', i + 2);
      i = end === -1 ? source.length : end + 2;
      continue;
    }
    if (source.startsWith('?>', i)) {
      return i + 2;
    }
    i += 1;
  }
  return source.length;
}

function findLiquidEnd(source, start) {
  const isOutput = source.startsWith('{{', start);
  const closer = isOutput ? '}}' : '%}';
  let i = start + 2;
  while (i < source.length) {
    const ch = source[i];
    if (ch === "'" || ch === '"') {
      i = scanPhpString(source, i, ch);
      continue;
    }
    if (source.startsWith(closer, i)) {
      return i + 2;
    }
    i += 1;
  }
  return source.length;
}

export function extractProtectedSyntax(source) {
  const regions = [];
  const parts = [];
  let last = 0;
  let i = 0;

  while (i < source.length) {
    const phpLen = isPhpStart(source, i);
    if (phpLen) {
      const end = findPhpEnd(source, i + phpLen);
      if (i > last) {
        parts.push({ type: 'html', value: source.slice(last, i) });
      }
      const value = source.slice(i, end);
      const id = regions.length;
      regions.push({ id, type: 'php', value });
      parts.push({ type: 'placeholder', id, kind: 'php' });
      last = end;
      i = end;
      continue;
    }

    const liquidStart =
      source.startsWith('{{', i) || source.startsWith('{%', i);
    if (liquidStart) {
      const end = findLiquidEnd(source, i);
      if (i > last) {
        parts.push({ type: 'html', value: source.slice(last, i) });
      }
      const value = source.slice(i, end);
      const id = regions.length;
      regions.push({ id, type: 'liquid', value });
      parts.push({ type: 'placeholder', id, kind: 'liquid' });
      last = end;
      i = end;
      continue;
    }

    i += 1;
  }

  if (last < source.length) {
    parts.push({ type: 'html', value: source.slice(last) });
  }

  return { parts, regions };
}

export function maskProtectedSyntax(source) {
  const { parts, regions } = extractProtectedSyntax(source);
  const masked = parts
    .map((part) => {
      if (part.type === 'placeholder') {
        return `<!--CCPROTECT:${part.id}-->`;
      }
      return part.value;
    })
    .join('');
  return { masked, regions };
}

export function restoreProtectedSyntax(masked, regions) {
  let output = masked;
  for (const region of regions) {
    const token = `<!--CCPROTECT:${region.id}-->`;
    if (!output.includes(token)) {
      throw new Error(`Protected region ${region.id} was lost during formatting.`);
    }
    output = output.split(token).join(region.value);
  }
  if (output.includes('<!--CCPROTECT:')) {
    throw new Error('Formatting produced unresolved protected-region markers.');
  }
  return output;
}

export function collectProtectedValues(source) {
  return extractProtectedSyntax(source).regions.map((region) => region.value);
}
