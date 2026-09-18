import prettier from 'prettier/standalone';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';

function stripCssComments(code) {
  let output = '';
  let i = 0;
  let inSingle = false;
  let inDouble = false;
  while (i < code.length) {
    const ch = code[i];
    if (inSingle) {
      output += ch;
      if (ch === '\\') {
        output += code[i + 1] || '';
        i += 2;
        continue;
      }
      if (ch === "'") {
        inSingle = false;
      }
      i += 1;
      continue;
    }
    if (inDouble) {
      output += ch;
      if (ch === '\\') {
        output += code[i + 1] || '';
        i += 2;
        continue;
      }
      if (ch === '"') {
        inDouble = false;
      }
      i += 1;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      output += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      output += ch;
      i += 1;
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      i = end === -1 ? code.length : end + 2;
      continue;
    }
    output += ch;
    i += 1;
  }
  return output;
}

export async function formatCss(source, options = {}) {
  const input = options.preserveComments === false ? stripCssComments(source) : source;
  return prettier.format(input, {
    parser: 'css',
    plugins: [prettierPluginPostcss],
    tabWidth: options.tabWidth ?? 2,
    useTabs: Boolean(options.useTabs),
    printWidth: options.printWidth ?? 80,
  });
}
