import { describe, expect, it } from 'vitest';
import { Engine } from 'php-parser';
import { collectProtectedValues } from '../../src/parsers/languageTokenizer.js';
import { formatPhp } from '../../src/formatters/php/index.js';
import { wordpressTemplate } from '../fixtures/samples.js';

describe('PHP parser safety', () => {
  it('still parses protected PHP after mixed-template formatting', async () => {
    const engine = new Engine({
      parser: { extractDoc: true, php7: true },
      ast: { withPositions: true },
    });
    const formatted = await formatPhp(wordpressTemplate);
    const regions = collectProtectedValues(formatted);
    expect(regions.length).toBeGreaterThan(0);
    for (const region of regions) {
      expect(() => engine.parseCode(region, 'region.php')).not.toThrow();
    }
  });
});
