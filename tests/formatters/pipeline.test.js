import { describe, expect, it } from 'vitest';
import { formatCss } from '../../src/formatters/css/index.js';
import { formatJavaScript, formatJson } from '../../src/formatters/javascript/index.js';
import { formatPhp } from '../../src/formatters/php/index.js';
import { formatLiquid } from '../../src/formatters/liquid/index.js';
import { optimizeCode } from '../../src/formatters/index.js';
import {
  messyCss,
  messyJs,
  messyJson,
  wordpressTemplate,
  liquidTemplate,
  htmlWithCss,
  htmlWithJs,
  malformedHtml,
} from '../fixtures/samples.js';

describe('language formatters', () => {
  it('formats CSS without changing values or URLs', async () => {
    const output = await formatCss(messyCss);
    expect(output).toContain('color: red;');
    expect(output).toContain('https://cdn.example.com/bg.png');
  });

  it('formats JavaScript without rewriting strings', async () => {
    const output = await formatJavaScript(messyJs);
    expect(output).toContain('"Hello "');
    expect(output).toContain('https://example.com');
    expect(output).toContain('function greet(name)');
  });

  it('formats JSON', async () => {
    const output = await formatJson(messyJson);
    expect(output).toContain('"CodeClean"');
    expect(JSON.parse(output)).toEqual({ name: 'CodeClean', safe: true });
  });

  it('preserves PHP and WordPress syntax while formatting HTML', async () => {
    const output = await formatPhp(wordpressTemplate);
    expect(output).toContain('<?php get_header(); ?>');
    expect(output).toContain('<?php the_title(); ?>');
    expect(output).toContain('[gallery id="42"]');
    expect(output).toContain('<?php get_footer(); ?>');
  });

  it('preserves Liquid objects, filters, and conditions', async () => {
    const output = await formatLiquid(liquidTemplate);
    expect(output).toContain('{{ product.title }}');
    expect(output).toContain('{% if product.available %}');
    expect(output).toContain('{{ product.price | money }}');
    expect(output).toContain('{% endif %}');
  });

  it('formats HTML around style and script without executing them', async () => {
    const cssDoc = await optimizeCode(htmlWithCss, { language: 'html' });
    const jsDoc = await optimizeCode(htmlWithJs, { language: 'html' });
    expect(cssDoc.status).toBe('success');
    expect(cssDoc.output).toContain('body{color:red;}');
    expect(jsDoc.output).toContain('console.log("keep");');
  });

  it('falls back to original input on destructive or failed formatting', async () => {
    const result = await optimizeCode(malformedHtml, { language: 'javascript' });
    expect(result.output).toBe(malformedHtml);
    expect(['parse_error', 'formatting_error', 'validation_error', 'warning']).toContain(
      result.status,
    );
  });
});
