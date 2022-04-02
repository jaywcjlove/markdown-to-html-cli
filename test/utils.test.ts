import { formatConfig } from '../packages/cli/src';

it('document.title test case', async () => {
  expect(formatConfig({ })).toHaveProperty('document.title', 'markdown-to-html-cli-title-test');
});

it('document.meta[].description test case', async () => {
  expect(formatConfig({ })).toHaveProperty('document.meta', [{ description: 'Converts markdown text to HTML.' }]);
});