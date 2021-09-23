markdown-to-html-cli
---

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
    "title": "markdown-to-html-cli",
    "style": "body { color: red; }",
    "meta": [
      { "description": "Command line tool generates markdown as html." },
      { "keywords": "store,localStorage,lightweight,JavaScript" }
    ],
  }
}
```

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
  --keywords         Define keywords for search engines.
  --title            The `<title>` tag is required in HTML documents!
  --author           Define the author of a page.
  --description      Describe metadata within an HTML document.
  --github-corners   Add a Github corner to your project page.

Example:

  npm markdown-to-html-cli
  npm markdown-to-html-cli --markdown="Hello World!"
  npm markdown-to-html-cli --github-corners https://github.com/jaywcjlove/markdown-to-html-cli
  npm markdown-to-html-cli --output coverage/index.html
  npm markdown-to-html-cli --source README.md
```

## Development

```bash
$ npm i
$ npm run build
$ npm run watch
```

## License

MIT © [Kenny Wong](https://wangchujiang.com/)
