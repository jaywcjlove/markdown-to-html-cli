markdown-to-html-cli
===
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

[![Downloads](https://img.shields.io/npm/dm/markdown-to-html-cli.svg?style=flat)](https://www.npmjs.com/package/markdown-to-html-cli)
[![npm version](https://img.shields.io/npm/v/markdown-to-html-cli.svg)](https://www.npmjs.com/package/markdown-to-html-cli)
[![Build and Test](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/markdown-to-html-cli/badges.svg)](https://jaywcjlove.github.io/markdown-to-html-cli/lcov-report/)
[![English Document](https://jaywcjlove.github.io/sb/lang/english.svg)](README.md)

将 Markdown 文本转换为 HTML，提供命令行工具和方法。如果您是简单的将少量 markdown 文件（或文本）转换成 HTML 页面，这将对你很有帮助。

## Usage

在 Github [Actions](https://github.com/actions) 中使用。

```yml
- run: npm i markdown-to-html-cli -g
- run: markdown-to-html --output coverage/index.html
- run: markdown-to-html --source src/README.md --output coverage/index.html
# or
- name: Converts Markdown to HTML
  uses: jaywcjlove/markdown-to-html-cli@main
  with:
    source: README-zh.md
    output: coverage/action.html
    github-corners: https://github.com/jaywcjlove/markdown-to-html-cli
    favicon: data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>
```

使用命令

```js
{
  "scripts": {
    "start": "markdown-to-html --output coverage/index.html"
  },
  "devDependencies": {
    "markdown-to-html-cli": "latest"
  }
}
```

在 [Nodejs](https://nodejs.org) 中使用。

```js
import { create } from 'markdown-to-html-cli';

const html = create({
  markdown: 'Hello World! **Bold**\n# Title',
  document: {
    style: ['body { background: red; }'],
  }
});
// => HTML String
```

## 安装

```bash
$ npm i markdown-to-html-cli
```

## Github [Actions](https://github.com/actions)

```yml
- name: Converts Markdown to HTML
  uses: jaywcjlove/markdown-to-html-cli@main
  with:
    source: README-zh.md
    output: coverage/action.html
    github-corners: https://github.com/jaywcjlove/markdown-to-html-cli
    favicon: data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>
```

Input Parameters

## 在 package.json 中配置

可以通过 `--config="config/conf.json"` 指定配置，默认可以在 `package.json`。

```js
{
  "markdown-to-html": {
    "document": {
      "title": "markdown-to-html-cli",
      "description": "Command line tool generates markdown as html.",
      "style": "body { color: red; }",
      "meta": [
        { "description": "Command line tool generates markdown as html." },
        { "keywords": "store,localStorage,lightweight,JavaScript" }
      ]
    },
    "favicon": "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>",
    "github-corners": "https://github.com/jaywcjlove/markdown-to-html-cli",
    "reurls": {
      "README-zh.md": "index.zh.html",
      "README.md": "index.html"
    }
  }
}
```

- [`name`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L2) -> `'markdown-to-html'.title` - 定义 `<title>` 文档标题内容！
- [`description`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L4) -> `'markdown-to-html'.description` - 定义您的网页的描述。
- [`repository.url`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L22) -> `'markdown-to-html'.github-corners` - 在你的项目页面添加一个 Github Corners。
- [`keywords`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L24-L30) -> `'markdown-to-html'.document.meta` - 定义搜索引擎的关键字。

## 命令帮助

```bash
Usage: markdown-to-html [options] [--help|h]

Options:

  --author          Define the author of a page.
  --config, -o      Specify the configuration file. Default: "<process.cwd()>/package.json".
  --description     Define a description of your web page.
  --favicon         Add a Favicon to your Site.
  --github-corners  Add a Github corner to your project page.
  --github-corners-fork  Github corners style.
  --keywords        Define keywords for search engines.
  --markdown        Markdown string.
  --output, -o      Output static pages to the specified directory. Default: "index.html"
  --source, -s      The path of the target file "README.md". Default: "README.md"
  --title           The `<title>` tag is required in HTML documents!
  --version, -v     Show version number
  --help, -h        Displays help information.

Example:

  npm markdown-to-html-cli
  npm markdown-to-html     --title="Hello World!"
  npm markdown-to-html     --config="config/conf.json"
  npm markdown-to-html-cli --markdown="Hello World!"
  npm markdown-to-html-cli --github-corners https://github.com/jaywcjlove/markdown-to-html-cli
  npm markdown-to-html-cli --github-corners https://github.com/jaywcjlove --github-corners-fork
  npm markdown-to-html-cli --output coverage/index.html
  npm markdown-to-html-cli --source README.md
```

## Markdown Features

### 支持 CSS 样式定义

使用 HTML 注释 [`<!--rehype:xxx-->`](https://github.com/jaywcjlove/rehype-attr)<!--rehype:style=color: red;--> 让 Markdown 支持样式自定义。

```markdown
## Title
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

Markdown Supports **Style**<!--rehype:style=color: red;-->
```

### 支持 [GFM 注脚](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)

```markdown
Here is a simple footnote[^1]. With some additional text after it.

[^1]: My reference.
```

### [任务清单](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#task-lists)

要创建任务列表，请在列表项前添加一个常规空格字符，后跟 `[ ]`。要将任务标记为完成，请使用 `[x]`。

```markdown
- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:
```

If a task list item description begins with a parenthesis, you'll need to escape it with `\`:

```markdown
- [ ] \(Optional) Open a followup issue
```

## API

```js
import 'markdown-to-html-cli/github-fork-ribbon.css';
import 'markdown-to-html-cli/github.css';
```

```ts
import { ParsedArgs } from 'minimist';
import { Options } from 'rehype-document';
export interface CreateOptions extends MDToHTMLOptions { }
export declare function create(options?: CreateOptions): string;
export interface RunArgvs extends Omit<ParsedArgs, '_'> {
  version?: string;
  source?: string;
  output?: string;
  /** Add a Github corner to your project page. */
  'github-corners'?: string;
  /** Github corners style. */
  'github-corners-fork'?: boolean;
  /** Markdown string. */
  markdown?: string;
  /** The `<title>` tag is required in HTML documents! */
  title?: string;
  /** Specify the configuration file. Default: `<process.cwd()>/package.json` */
  config?: string;
  /** Define a description of your web page */
  description?: string;
  /** Define keywords for search engines */
  keywords?: string;
  /** Add a Favicon to your Site */
  favicon?: string;
  /** Define the author of a page */
  author?: string;
}
export interface MDToHTMLOptions extends RunArgvs {
  /** [rehype-document](https://github.com/rehypejs/rehype-document#options) options */
  document?: Options;
  /** Rewrite Element. [rehype-rewrite](https://github.com/jaywcjlove/rehype-rewrite#rewritenode-index-parent-void) */
  rewrite?: RehypeRewriteOptions['rewrite'];
  /** rewrite URLs of href and src attributes. */
  reurls?: Record<string, string>;
}
export declare function run(opts?: Omit<RunArgvs, "_">): any;
export declare const cliHelp: string;
export declare const exampleHelp: string;
```

## Development

```bash
$ npm i
$ npm run build
$ npm run watch
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/markdown-to-html-cli/graphs/contributors">
  <img src="https://jaywcjlove.github.io/markdown-to-html-cli/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT © [Kenny Wong](https://wangchujiang.com/)
