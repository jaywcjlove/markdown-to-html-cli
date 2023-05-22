import FS from 'fs-extra';
import { copyElement } from '../packages/cli/src/nodes/copy';
import { githubCorners } from '../packages/cli/src/nodes/github-corners';
import { markdownStyle } from '../packages/cli/src/nodes/markdown-style';
import { githubCornersFork } from '../packages/cli/src/nodes/github-corners-fork';
import { cliHelp, exampleHelp, run } from '../packages/cli/src/index';
import pkg from '../packages/cli/package.json';

console.log = jest.fn();

it('githubCorners test case', async () => {
  expect(githubCorners({ })).toBeUndefined();
  expect(githubCornersFork({ })).toBeUndefined();
  expect(Object.keys(githubCorners({ href: 'https://github.com/jaywcjlove/markdown-to-html-cli' }))).toEqual(expect.arrayContaining(["0", "1"]));
});

it('copyElement test case', async () => {
  expect(Object.keys(copyElement())).toEqual(expect.arrayContaining(['type', 'tagName', 'properties', 'children']));
});

it('markdownStyle test case', async () => {
  console.log(`markdownStyle([], 'light')[1].properties::::`, markdownStyle([], 'light')[1].properties)
  expect(markdownStyle([], undefined).length).toEqual(2);
  expect(markdownStyle([], 'light')[1].properties).toEqual(expect.objectContaining({
    "className": "markdown-style",
    "mode": "light",
    "style": "max-width: 960px; margin: 0 auto 60px auto; padding: 8px;",
  }));
  expect(markdownStyle([], 'dark')[1].properties).toEqual(expect.objectContaining({
    "className": "markdown-style",
    "mode": "dark",
    "style": "max-width: 960px; margin: 0 auto 60px auto; padding: 8px;",
  }));
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
    }
  })
  expect(run({ config: 'test/demo/config.json', output: 'test/demo/index.html', author: 'kenny', markdown: 'Hello World! [](README.md)' })).toBeUndefined();
  const htmlStr = await FS.readFile('test/demo/index.html');
  expect(htmlStr.toString().indexOf('Hello World!<a href="index.html">') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('https://github.com/jaywcjlove/markdown-to-html-cli.git') > 0).toBeFalsy();
  expect(htmlStr.toString().indexOf('data:image/svg+xml') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('html,cli') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('kenny') > 0).toBeTruthy();
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
    }
  })
  expect(run({ config: 'test/demo/config.json', output: 'test/demo/index.html', keywords: 'html,cli', markdown: 'Hello World! [](README.md)' })).toBeUndefined();
  const htmlStr = await FS.readFile('test/demo/index.html');
  expect(htmlStr.toString().indexOf('html,cli') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('https://github.com/jaywcjlove/markdown-to-html-cli.git') > 0).toBeTruthy();
  await FS.remove('test/demo');
});

it('github-corners-fork test case', async () => {
  await FS.mkdirs('test/demo');
  await FS.writeJSON('test/demo/config.json', {
    "keywords": ["html", "cli"],
    "markdown-to-html": {
      "favicon": "data:image/svg+xml",
      "github-corners-fork": true,
      'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli.git',
      "reurls": {
        "README.md": "index.html"
      },
    }
  })
  expect(run({ config: 'test/demo/config.json', output: 'test/demo/index.html', keywords: 'html,cli', markdown: 'Hello World! [](README.md)' })).toBeUndefined();
  const htmlStr = await FS.readFile('test/demo/index.html');
  expect(htmlStr.indexOf('data-ribbon="Fork me on GitHub"') > 0).toBeTruthy();
  expect(htmlStr.toString().indexOf('https://github.com/jaywcjlove/markdown-to-html-cli.git') > 0).toBeTruthy();
  await FS.remove('test/demo');
});