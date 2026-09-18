import { describe, expect, it } from 'vitest';
import { validateOutput } from '../../src/validation/validateOutput.js';
import { collectProtectedValues } from '../../src/parsers/languageTokenizer.js';
import { wordpressTemplate, liquidTemplate } from '../fixtures/samples.js';

describe('validation', () => {
  it('rejects empty output for non-empty input', () => {
    const result = validateOutput('<div>Hi</div>', '', 'html');
    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation_error');
  });

  it('rejects lost URLs', () => {
    const result = validateOutput(
      '<a href="https://keep.example.com">x</a>',
      '<a href="#">x</a>',
      'html',
    );
    expect(result.ok).toBe(false);
  });

  it('keeps protected PHP regions', () => {
    const regions = collectProtectedValues(wordpressTemplate);
    expect(regions.length).toBeGreaterThan(0);
    const result = validateOutput(wordpressTemplate, wordpressTemplate, 'wordpress', {
      protectedValues: regions,
    });
    expect(result.ok).toBe(true);
  });

  it('rejects missing Liquid regions', () => {
    const regions = collectProtectedValues(liquidTemplate);
    const result = validateOutput(liquidTemplate, '<h1></h1>', 'liquid', {
      protectedValues: regions,
    });
    expect(result.ok).toBe(false);
  });
});
