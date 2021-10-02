markdown-to-html-cli
===

[![Downloads](https://img.shields.io/npm/dm/markdown-to-html-cli.svg?style=flat)](https://www.npmjs.com/package/markdown-to-html-cli)
[![npm version](https://img.shields.io/npm/v/markdown-to-html-cli.svg)](https://www.npmjs.com/package/markdown-to-html-cli)
[![Build and Test](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/markdown-to-html-cli/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/markdown-to-html-cli/badges.svg)](https://jaywcjlove.github.io/markdown-to-html-cli/lcov-report/)

Command line tool generates markdown as html.

## Usage

Used in Github Actions.

```yml
- run: npm i markdown-to-html-cli -g
- run: markdown-to-html --output coverage/index.html
```

## Install

```shell
$ npm i markdown-to-html-cli
```

## Configure in package.json

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
    "github-corners": "https://github.com/jaywcjlove/markdown-to-html-cli",
    "reurls": {
      "README-zh.md": "index.zh.html",
      "README.md": "index.html"
    }
  }
}
```

- [`name`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L2) -> `'markdown-to-html'.title` - The `<title>` tag is required in HTML documents!
- [`description`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L4) -> `'markdown-to-html'.description` - Define a description of your web page.
- [`repository.url`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L22) -> `'markdown-to-html'.github-corners` - Define a description of your web page.
- [`keywords`](https://github.com/jaywcjlove/markdown-to-html-cli/blob/308ca37aa5b9ae846a7835092a183d0ed73a8dc4/package.json#L24-L30) -> `'markdown-to-html'.document.meta` - Define a description of your web page.

## Command Help

```bash
Usage: markdown-to-html [options] [--help|h]

Options:

  --version, -v      Show version number
  --help, -h         Displays help information.
  --output, -o       Output static pages to the specified directory. Default: index.html
  --source, -s       The path of the target file "README.md". Default: README.md
  --markdown         Markdown string.
  --description      Define a description of your web page.
  --favicon          Add a Favicon to your Site.
  --keywords         Define keywords for search engines.
  --title            The `<title>` tag is required in HTML documents!
  --author           Define the author of a page.
  --github-corners   Add a Github corner to your project page.

Example:

  npm markdown-to-html-cli
  npm markdown-to-html     --title="Hello World!"
  npm markdown-to-html-cli --markdown="Hello World!"
  npm markdown-to-html-cli --github-corners https://github.com/jaywcjlove/markdown-to-html-cli
  npm markdown-to-html-cli --output coverage/index.html
  npm markdown-to-html-cli --source README.md
```

## API 

```ts
import { ParsedArgs } from 'minimist';
import { Options } from 'rehype-document';
export interface RunArgvs extends ParsedArgs {
  version?: string;
  source?: string;
  output?: string;
  /** Add a Github corner to your project page */
  'github-corners'?: string;
  /** Markdown string. */
  markdown?: string;
  /** The `<title>` tag is required in HTML documents! */
  title?: string;
  /** Define a description of your web page */
  description?: string;
  /** Define keywords for search engines */
  keywords?: string;
  /** Add a Favicon to your Site */
  favicon?: string;
  /** Define the author of a page */
  author?: string;
}
export interface MDToHTMLOptions extends Omit<RunArgvs, '_'> {
  'github-corners'?: RunArgvs['github-corners'];
  document?: Options;
  /** rewrite URLs of href and src attributes. */
  reurls?: Record<string, string>;
  /**
   * rehype-wrap Options
   * Wrap selected elements with a given element
   * https://github.com/mrzmmr/rehype-wrap/tree/2402bcdb8ea25bd0948cda72e96d16e65a18c1e9#options
   */
  wrap?: {
    selector?: string;
    wrapper?: string;
  };
}
export declare function run(opts?: Omit<RunArgvs, "_">): any;
export declare function cliHelp(): void;
export declare function exampleHelp(): void;
```

## Development

```bash
$ npm i
$ npm run build
$ npm run watch
```

## License

MIT © [Kenny Wong](https://wangchujiang.com/)
