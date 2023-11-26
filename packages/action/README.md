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

### Input Parameters

- `output` - Output static pages to the specified directory. (default: `index.html`)
- `source` - The path of the target file "README.md". (default: `README.md`)
- `description` - Define a description of your web page. 
- `config` - Specify the configuration file. (default: `package.json`)
- `markdown` - Markdown string 
- `favicon` - Add a Favicon to your Site. 
- `github-corners` - Add a Github corner to your project page. 
- `dark-mode` - Disable light and dark theme styles. (default: `true`)

### Output Parameters

- `output` - Output static pages to the specified directory
- `markdown` - Markdown string
- `html` - HTML string

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/markdown-to-html-cli/graphs/contributors">
  <img src="https://jaywcjlove.github.io/markdown-to-html-cli/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT © [Kenny Wong](https://wangchujiang.com/)
