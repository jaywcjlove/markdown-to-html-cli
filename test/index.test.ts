import FS from 'fs-extra';
import { githubCorners } from '../packages/cli/src/nodes/githubCorners';
import { githubCornersFork } from '../packages/cli/src/nodes/githubCornersFork';
import { cliHelp, exampleHelp, run } from '../packages/cli/src';
import pkg from '../packages/cli/package.json';

console.log = jest.fn();

it('githubCorners test case', async () => {
  expect(githubCorners({ })).toBeUndefined();
  expect(githubCornersFork({ })).toBeUndefined();
  expect(Object.keys(githubCorners({ href: 'https://github.com/jaywcjlove/markdown-to-html-cli' }))).toEqual(expect.arrayContaining(['type', 'tagName', 'properties', 'children']));
});

it('exampleHelp test case', async () => {
  expect(typeof exampleHelp).toEqual('string');
  expect(typeof cliHelp).toEqual('string');
});

it('description options test case', async () => {
  expect(run({ description: 'description test case.' })).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe('\nmarkdown-to-html: \x1b[32;1mindex.html\x1b[0m\n');
});

it('cli test case', async () => {
  expect(require('../packages/cli/src/cli')).toEqual({});
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe('\nmarkdown-to-html: \x1b[32;1mindex.html\x1b[0m\n');
});

it('run test case', async () => {
  expect(typeof run({ v: true })).toEqual('string');
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`\n \x1b[35mmarkdown-to-html-cli\x1b[0m v${pkg.version}\n`);
});

it('help test case', async () => {
  expect(typeof exampleHelp).toEqual('string');
  expect(typeof cliHelp).toEqual('string');
  expect(run({ h: true })).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`${cliHelp}${exampleHelp}`);
});

it('config test case', async () => {
  await FS.mkdirs('test/demo');
  await FS.writeJSON('test/demo/config.json', {
    "repository": "https://github.com/jaywcjlove/markdown-to-html-cli.git",
    "keywords": ["html", "cli"],
    "markdown-to-html": {
      "favicon": "data:image/svg+xml",
      "reurls": {
        "README.md": "index.html"
      },
      "wrap": { wrapper: 'div.wmde-markdown.good' },
    }
  })
  expect(run({ config: 'test/demo/config.json', output: 'test/demo/index.html', author: 'kenny', markdown: 'Hello World! [](README.md)' })).toBeUndefined();
  const htmlStr = await FS.readFile('test/demo/index.html');
  expect(htmlStr.toString().indexOf('Hello World!<a href="index.html">') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('https://github.com/jaywcjlove/markdown-to-html-cli.git') > 0).toBeFalsy();
  expect(htmlStr.toString().indexOf('data:image/svg+xml') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('html,cli') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('kenny') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('wmde-markdown good') > 0).toBeTruthy();
  await FS.remove('test/demo');
});

it('keywords test case', async () => {
  await FS.mkdirs('test/demo');
  await FS.writeJSON('test/demo/config.json', {
    "keywords": ["html", "cli"],
    "markdown-to-html": {
      "favicon": "data:image/svg+xml",
      'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli.git',
      "reurls": {
        "README.md": "index.html"
      },
      "wrap": { wrapper: 'div.wmde-markdown.good' },
    }
  })
  expect(run({ config: 'test/demo/config.json', output: 'test/demo/index.html', keywords: 'html,cli', markdown: 'Hello World! [](README.md)' })).toBeUndefined();
  const htmlStr = await FS.readFile('test/demo/index.html');
  console.log('>>>>', htmlStr.toString())
  expect(htmlStr.toString().indexOf('html,cli') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('https://github.com/jaywcjlove/markdown-to-html-cli.git') > 0).toBeTruthy();
  await FS.remove('test/demo');
});