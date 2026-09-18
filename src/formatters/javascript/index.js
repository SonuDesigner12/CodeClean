import prettier from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';

export async function formatJavaScript(source, options = {}) {
  return prettier.format(source, {
    parser: 'babel',
    plugins: [prettierPluginBabel, prettierPluginEstree],
    tabWidth: options.tabWidth ?? 2,
    useTabs: Boolean(options.useTabs),
    printWidth: options.printWidth ?? 80,
    semi: true,
    singleQuote: false,
    trailingComma: 'none',
  });
}

export async function formatJson(source, options = {}) {
  return prettier.format(source, {
    parser: 'json',
    plugins: [prettierPluginBabel, prettierPluginEstree],
    tabWidth: options.tabWidth ?? 2,
    useTabs: Boolean(options.useTabs),
    printWidth: options.printWidth ?? 80,
  });
}
