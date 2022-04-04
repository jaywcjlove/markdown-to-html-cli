import { create } from '../packages/cli/src';

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

it('options.document.script=[] test case', async () => {
  const html = create({
    markdown: 'Hello World! **Bold**\n# Title\n[doc](README.md)',
    document: {
      script: ['console.log("Hello")'],
      js: "https://unpkg.com/@wcj/dark-mode"
    }
  });
  expect(html.indexOf('<script>console.log("Hello")</script>') > -1).toBeTruthy();
  expect(html.indexOf('<script src="https://unpkg.com/@wcj/dark-mode"></script>') > -1).toBeTruthy();
});

it('options.document.js=[] test case', async () => {
  const html = create({
    markdown: 'Hello World! **Bold**\n# Title\n[doc](README.md)',
    document: {
      script: 'console.log("Hello")',
      js: ["https://unpkg.com/@wcj/dark-mode"]
    }
  });
  expect(html.indexOf('<script>console.log("Hello")</script>') > -1).toBeTruthy();
  expect(html.indexOf('<script src="https://unpkg.com/@wcj/dark-mode"></script>') > -1).toBeTruthy();
});

it('options=undefined test case', async () => {
  expect(create().indexOf('<dark-mode permanent') > -1).toBeTruthy();
  expect(create().indexOf('</markdown-style>') > -1).toBeTruthy();
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
  expect(html.indexOf('<dark-mode permanent style=') > 0).toBeTruthy();
  expect(html.indexOf('<github-corners target="__blank"') > 0).toBeTruthy();
  expect(html.indexOf('<markdown-style') > 0).toBeTruthy();
  expect(html.indexOf('max-width: 960px; margin: 0 auto 60px auto; padding: 8px') > 0).toBeTruthy();
  expect(html.indexOf('class="markdown-body"') > 0).toBeTruthy();

  html = create({
    markdown: 'Hello World!',
    'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli',
    document: undefined,
  });
  expect(html.indexOf('<github-corners target="__blank" position="fixed" href="https://github.com/jaywcjlove/markdown-to-html-cli"></github-corners>') > 0).toBeTruthy();
  expect(html.indexOf('https://github.com/jaywcjlove/markdown-to-html-cli') > -1).toBeTruthy();

  html = create({
    'github-corners-fork': true,
    'github-corners': 'https://github.com/jaywcjlove/markdown-to-html-cli',
    markdown: 'Hello World!',
    document: {},
  });
  expect(html.indexOf('data-ribbon="Fork me on GitHub"') > 0).toBeTruthy();
});

it('video preview test case', async () => {
  let html = create({
    markdown: 'test\n\nhttps://user-images.githubusercontent.com/1680273/138299599-88547edd-859c-44c9-8b52-2cc06f7f2dd3.mov',
    rewrite: (node) => {
      if (node.type === 'element' && node.tagName === 'p') {
        node.properties.className = 'test';
      }
    }
  });
  expect(html.indexOf('<video muted controls') > 0).toBeTruthy();
});
