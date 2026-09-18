import { describe, expect, it } from 'vitest';
import { detectLanguage } from '../../src/detector/detectLanguage.js';
import {
  messyHtml,
  messyCss,
  messyJs,
  wordpressTemplate,
  liquidTemplate,
  messyJson,
} from '../fixtures/samples.js';

describe('language detection', () => {
  it('detects HTML', () => {
    expect(detectLanguage(messyHtml).id).toBe('html');
  });

  it('detects CSS', () => {
    expect(detectLanguage(messyCss).id).toBe('css');
  });

  it('detects JavaScript', () => {
    expect(detectLanguage(messyJs).id).toBe('javascript');
  });

  it('detects WordPress PHP templates', () => {
    expect(detectLanguage(wordpressTemplate).id).toBe('wordpress');
  });

  it('detects Liquid', () => {
    expect(detectLanguage(liquidTemplate).id).toBe('liquid');
  });

  it('detects JSON', () => {
    expect(detectLanguage(messyJson).id).toBe('json');
  });

  it('marks empty input as uncertain', () => {
    expect(detectLanguage('').uncertain).toBe(true);
  });
});
