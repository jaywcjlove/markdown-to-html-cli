markdown-to-html-cli
===
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Downloads](https://img.shields.io/npm/dm/markdown-to-html-cli.svg?style=flat)](https://www.npmjs.com/package/markdown-to-html-cli)
[![npm version](https://img.shields.io/npm/v/markdown-to-html-cli.svg)](https://www.npmjs.com/package/markdown-to-html-cli)
[![Build and Test](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/markdown-to-html-cli/badges.svg)](https://jaywcjlove.github.io/markdown-to-html-cli/lcov-report/)
[![中文文档](https://jaywcjlove.github.io/sb/lang/chinese.svg)](README-zh.md)

Converts markdown text to HTML, Provide command line tools and methods. If you are simply converting a small number of Markdown files (or text) into HTML pages, this is very helpful for you.

## Usage

Used in Github [Actions](https://github.com/actions).

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

Using With Command.

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

Used in [Nodejs](https://nodejs.org).

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

## Install

```shell
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

### Input Parameters

- `output` - Output static pages to the specified directory. (default: `index.html`)
- `source` - The path of the target file "README.md". (default: `README.md`)
- `description` - Define a description of your web page. 
- `config` - Specify the configuration file. (default: `package.json`)
- `markdown` - Markdown string 
- `favicon` - Add a Favicon to your Site. 
- `github-corners` - Add a Github corner to your project page. 
- `corners` - Show corners. (default: `true`)
- `dark-mode` - Disable light and dark theme styles button. (default: `true`)
- `markdown-style` - Markdown wrapper style. 
- `markdown-style-theme` - Setting markdown-style light/dark theme. (`dark | light`)
- `style` - Override default styles. css file path or css string
- `title` - Define the content of the "<title>" document title!

### Output Parameters

- `output` - Output static pages to the specified directory
- `markdown` - Markdown string
- `html` - HTML string

## Configure in package.json

The configuration can be specified through `--config="config/conf.json"`, It can be in `package.json` by default.

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

- [`name`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L2) -> `'markdown-to-html'.title` - Define the content of the `<title>` document title!
- [`description`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L4) -> `'markdown-to-html'.description` - Define a description of your web page.
- [`repository.url`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L22) -> `'markdown-to-html'.github-corners` - Add a Github corner to your project page.
- [`keywords`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L24-L30) -> `'markdown-to-html'.document.meta` - Define keywords for search engines.

## Command Help

```bash
Usage: markdown-to-html [options] [--help|h]

Options:

  --author                Define the author of a page.
  --config, -o            Specify the configuration file. Default: "<process.cwd()>/package.json".
  --description           Define a description of your web page.
  --favicon               Add a Favicon to your Site.
  --no-corners            Hide Github corner from your project page.
  --github-corners        Add a Github corner to your project page.
  --github-corners-fork   Github corners style.
  --keywords              Define keywords for search engines.
  --no-dark-mode          Disable light and dark theme styles button.
  --markdown              Markdown string.
  --img-base64            Convert images in HTML to base64.
  --style                 Override default styles. css file path or css string.
  --markdown-style-theme  Setting markdown-style light/dark theme.
  --markdown-style        Markdown wrapper style
  --ignore-file           Ignore markdown files under certain paths. Default: "(node_modules)"
  --output, -o            Output static pages to the specified directory. Default: "index.html"
  --source, -s            The path of the target file "README.md". Default: "README.md"
  --title                 The `<title>` tag is required in HTML documents!
  --version, -v           Show version number
  --help, -h              Displays help information.

Example:

  markdown-to-html     --title="Hello World!"
  markdown-to-html     --config="config/conf.json"
  npx markdown-to-html-cli
  npx markdown-to-html-cli **/*.md --output "dist"
  npx markdown-to-html-cli **/*.md --ignore-file="(test)"
  npx markdown-to-html-cli --markdown="Hello World!"
  npx markdown-to-html-cli --no-dark-mode
  npx markdown-to-html-cli --dark-mode auto
  npx markdown-to-html-cli --dark-mode auto --markdown-style-theme dark
  npx markdown-to-html-cli --no-dark-mode --markdown-style-theme dark
  npx markdown-to-html-cli --markdown-style-theme dark
  npx markdown-to-html-cli --github-corners https://github.com/jaywcjlove/markdown-to-html-cli
  npx markdown-to-html-cli --github-corners https://github.com/jaywcjlove --github-corners-fork
  npx markdown-to-html-cli --output coverage/index.html
  npx markdown-to-html-cli --source README.md
  npx markdown-to-html-cli --source README.md --style=./style.css
  npx markdown-to-html-cli --source README.md --style='body { color: red; }'
```

## Markdown Features

### Supports for CSS Style

Use HTML comments [`<!--rehype:xxx-->`](https://github.com/jaywcjlove/rehype-attr)<!--rehype:style=color: red;--> to let Markdown support style customization.

```markdown
## Title
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

Markdown Supports **Style**<!--rehype:style=color: red;-->
```

### Support for [GFM footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)

```markdown
Here is a simple footnote[^1]. With some additional text after it.

[^1]: My reference.
```

### [Task lists](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#task-lists)

To create a task list, preface list items with a regular space character followed by `[ ]`. To mark a task as complete, use `[x]`.

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
  /** Disable light and dark theme styles button. */
  'dark-mode'?: boolean;
  /** Setting markdown-style light/dark theme. */
  'markdown-style-theme'?: 'dark' | 'light';
  /** Markdown string. */
  markdown?: string;
  /** Markdown wrapper style */
  'markdown-style'?: string;
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
  /** Override default styles */
  style?: string;
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

## Related

- [markdown-to-html](https://github.com/jaywcjlove/markdown-to-html) Converts markdown text to HTML.

## Development

```bash
$ npm i
$ npm run build
$ npm run watch
```

## Related

- [html-to-markdown-cli](https://github.com/jaywcjlove/html-to-markdown-cli) Converts HTML to markdown.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/markdown-to-html-cli/graphs/contributors">
  <img src="https://jaywcjlove.github.io/markdown-to-html-cli/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT © [Kenny Wong](https://wangchujiang.com/)
