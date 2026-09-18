import { describe, expect, it } from 'vitest';
import { formatHtml } from '../../src/formatters/html/index.js';
import {
  messyHtml,
  messyHtmlWithUrl,
  protectedPre,
  htmlWithScript,
  aiMessyHtml,
  incompleteInput,
} from '../fixtures/samples.js';

describe('HTML formatter', () => {
  it('normalizes attributes and formatting-only whitespace', () => {
    const output = formatHtml(messyHtml);
    expect(output).toContain('<div class="container" Style=" ">');
    expect(output).toContain('<h1 class="fw-bold">Fixed Container</h1>');
    expect(output).toContain(
      '<p>This layout centers content and adapts its max-width at responsive breakpoints.</p>',
    );
    expect(output).not.toMatch(/\n\s*\n/);
  });

  it('preserves attribute values and URLs', () => {
    const output = formatHtml(messyHtmlWithUrl);
    expect(output).toContain('https://example.com/path?q=1');
    expect(output).toContain('class="link"');
  });

  it('protects preformatted text', () => {
    const output = formatHtml(protectedPre);
    expect(output).toContain('  keep   these');
  });

  it('protects script contents', () => {
    const output = formatHtml(htmlWithScript);
    expect(output).toContain('const x = 1;');
  });

  it('indents nested markup from messy AI output', () => {
    const output = formatHtml(aiMessyHtml);
    expect(output).toContain('<section id="hero" class="banner">');
    expect(output).toContain('https://cdn.example.com/hero.png');
    expect(output).toContain('<p>Welcome to CodeClean</p>');
  });

  it('keeps incomplete tags from disappearing', () => {
    const output = formatHtml(incompleteInput);
    expect(output).toContain('<div>');
  });
});

import { optimizeCode } from '../../src/formatters/index.js';

describe('one-click HTML pipeline', () => {
  it('optimizes the required messy HTML example', async () => {
    const result = await optimizeCode(messyHtml, { language: 'html' });
    expect(result.status).toBe('success');
    expect(result.output).toContain('<div class="container" Style=" ">');
    expect(result.output).toContain('<h1 class="fw-bold">Fixed Container</h1>');
  });
});
