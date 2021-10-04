import { create } from '../src/create';

it('options test case', async () => {
  const html = create({
    markdown: 'Hello World! **Bold**\n# Title\n[doc](README.md)',
    'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli',
    document: {
      style: 'body { background: red; }',
      title: 'Hello World!',
      link: [{
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '../favicon.png',
      }, {
        rel: 'stylesheet',
        href: '../base.css',
      }]
    },
    reurls: {
      "README.md": "index.html"
    }
  });
  expect(html.indexOf('<!doctype html>') > -1).toBeTruthy();
  expect(html.indexOf('<title>Hello World!</title>') > -1).toBeTruthy();
  expect(html.indexOf('https://github.com/jaywcjlove/markdown-to-html-cli') > -1).toBeTruthy();
  expect(html.indexOf('<strong>Bold</strong>') > -1).toBeTruthy();
  expect(html.indexOf('<h1 id="title">') > -1).toBeTruthy();
  expect(html.indexOf('<a href="index.html">doc</a>') > -1).toBeTruthy();
  expect(html.indexOf('<link rel="shortcut icon" type="image/x-icon" href="../favicon.png">') > -1).toBeTruthy();
  expect(html.indexOf('<link rel="stylesheet" href="../base.css">') > -1).toBeTruthy();
});

it('options.document.style=[] test case', async () => {
  const html = create({
    markdown: 'Hello World! **Bold**\n# Title\n[doc](README.md)',
    document: {
      style: ['body { background: red; }'],
      link: {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '../favicon.png',
      }
    }
  });
  expect(html.indexOf('<link rel="shortcut icon" type="image/x-icon" href="../favicon.png">') > -1).toBeTruthy();
  expect(html.indexOf('<style>body { background: red; }</style>') > -1).toBeTruthy();
});

it('options=undefined test case', async () => {
  expect(create()).toEqual('\n<div class="wmde-markdown"></div>\n');
});

it('options.document=undefined test case', async () => {
  const html = create({ document: undefined });
  expect(html.indexOf('<!doctype html>') === -1).toBeTruthy();
});

it('github-corners test case', async () => {
  let html = create({
    markdown: 'Hello World!',
    'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli',
    document: {},
  });
  expect(html.indexOf('<body><a aria-label="View source on GitHub"') > 0).toBeTruthy();

  html = create({
    markdown: 'Hello World!',
    'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli',
    document: undefined,
  });
  expect(html.indexOf('<a aria-label="View source on GitHub" target="__blank" class="github-corner"') === 0).toBeTruthy();
  expect(html.indexOf('https://github.com/jaywcjlove/markdown-to-html-cli') > -1).toBeTruthy();
});

