import fs from 'fs-extra';
import path from 'path';
import minimist, { type ParsedArgs } from 'minimist';
import { type Options } from 'rehype-document';
import { type RehypeRewriteOptions } from 'rehype-rewrite';
import { globSync } from "glob";
import { create } from './create.js';
import { formatConfig } from './utils.js';

export * from './create.js';
export * from './utils.js';

export interface RunArgvs extends Omit<ParsedArgs, '_'>  {
  version?: string;
  source?: string;
  output?: string;
  /** Add a Github corner to your project page. */
  'github-corners'?: string;
  /** Github corners style. */
  'github-corners-fork'?: boolean;
  /** Show corners. @default true */
  'corners'?: boolean;
  /** Disable light and dark theme styles button. */
  'dark-mode'?: boolean | 'auto';
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
  /** @example `(node_modules)` */
  ignoreFile?: string;
  /** Convert images in HTML to base64. @default `false` */
  'img-base64'?: boolean;
}

export interface MDToHTMLOptions extends RunArgvs {
  /** [rehype-document](https://github.com/rehypejs/rehype-document#options) options */
  document?: Options;
  /** Rewrite Element. [rehype-rewrite](https://github.com/jaywcjlove/rehype-rewrite#rewritenode-index-parent-void) */
  rewrite?: RehypeRewriteOptions['rewrite'];
  /** rewrite URLs of href and src attributes. */
  reurls?: Record<string, string>;
}

export function run(opts = {} as Omit<RunArgvs, '_'>) {
  const argvs = minimist<RunArgvs>(process.argv.slice(2), {
    alias: {
      help: 'h',
      version: 'v',
      config: 'c',
      source: 's',
      output: 'o',
    },
    default: {
      version: opts.v || opts.version || false,
      help: opts.h || opts.help || false,
      ignoreFile: opts.ignoreFile || '(node_modules)',
      'img-base64': opts.imgBase64 ?? false,
      source: opts.s || opts.source || 'README.md',
      markdown: opts.markdown || '',
      'markdown-style': 'max-width: 960px;',
      description: opts.description || '',
      corners: opts.corners || true,
      output: opts.o || opts.output,
    },
  });
  if (argvs.h || argvs.help) {
    console.log(`${cliHelp}${exampleHelp}`);
    return;
  }

  const mdFilesPath = globSync([...argvs._], {
    ignore: {
      ignored: p => {
        return (new RegExp(argvs.ignoreFile, 'i')).test(p.fullpath()) || !/\.md$/i.test(p.fullpath())
      },
    },
  });
  const pkgPath = path.resolve(new URL('../package.json', import.meta.url).pathname);
  if ((argvs.v || argvs.version) && fs.existsSync(pkgPath)) {
    const pkg = fs.readJSONSync(pkgPath);
    console.log(`\n \x1b[35mmarkdown-to-html-cli\x1b[0m v${pkg.version}\n`);
    return pkg.version;
  }
  // One File
  if (argvs.source && !argvs.markdown) {
    argvs.markdown = fs.readFileSync(path.resolve(argvs.source)).toString();
  } 
  const options = formatConfig({ ...opts, ...argvs });
  const output = path.resolve(argvs.output  || 'index.html');

  if (!Array.isArray(options.document.style)) options.document.style = [options.document.style].flat().filter(Boolean);
  if (options.style) {
    const stylePath = path.resolve(process.cwd(), options.style);
    if (fs.existsSync(stylePath)) {
      const cssString = fs.readFileSync(stylePath).toString();
      options.document.style.push(cssString);
    } else {
      options.document.style.push(options.style);
    }
  }
  // One File
  if (mdFilesPath.length === 0) {
    options.sourcePath = path.resolve(argvs.source);
    const strMarkdown = create({ ...argvs, ...options });
    fs.writeFileSync(output, strMarkdown);
    console.log(`\nmarkdown-to-html: \x1b[32;1m${path.relative(process.cwd(), output)}\x1b[0m\n`);
  }
  if (mdFilesPath.length > 0) {
    mdFilesPath.forEach((mdFile) => {
      options.sourcePath = path.resolve(mdFile);
      options.markdown = fs.readFileSync(path.resolve(mdFile)).toString();

      const htmlPath = path.resolve(mdFile.replace(/\.md$/i, '.html').replace(/README\.html$/i, 'index.html').replace(/README-(.*)\.html$/i, 'index-$1.html'));
      const mdFilePath = path.resolve(
        process.cwd(),
        (argvs.output || 'dist') + htmlPath.replace(process.cwd(), '')
      );
      options.output = mdFilePath;
      const strMarkdown = create({ ...argvs, ...options });
      fs.ensureDirSync(path.dirname(options.output));
      fs.writeFileSync(options.output, strMarkdown);
      console.log(`\nmarkdown-to-html: \x1b[32;1m${path.relative(process.cwd(), options.output)}\x1b[0m\n`);
    });
  }
}

export const cliHelp: string = `\n  Usage: markdown-to-html [options] [--help|h]

  Options:\n
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
    --markdown-style        Markdown wrapper style.
    --output, -o            Output static pages to the specified directory. Default: "index.html"
    --source, -s            The path of the target file "README.md". Default: "README.md"
    --title                 The \`<title>\` tag is required in HTML documents!
    --ignore-file           Ignore markdown files under certain paths. Default: "(node_modules)"
    --version, -v           Show version number
    --help, -h              Displays help information.
`;

export const exampleHelp: string =`\n  Example:

    \x1b[35mnpx\x1b[0m markdown-to-html-cli
    \x1b[35mnpx\x1b[0m markdown-to-html-cli **/*.md \x1b[33m--output\x1b[0m "dist"
    \x1b[35mnpx\x1b[0m markdown-to-html-cli **/*.md \x1b[33m--ignore-file\x1b[0m="(test)"
    \x1b[35mmarkdown-to-html\x1b[0m         \x1b[33m--title\x1b[0m="Hello World!"
    \x1b[35mmarkdown-to-html\x1b[0m         \x1b[33m--config\x1b[0m="config/conf.json"
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--markdown\x1b[0m="Hello World!"
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--no-dark-mode\x1b[0m
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--markdown-style-theme\x1b[0m dark
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--github-corners\x1b[0m https://github.com/jaywcjlove/markdown-to-html-cli
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--github-corners\x1b[0m https://github.com/jaywcjlove --github-corners-fork
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--output\x1b[0m coverage/index.html
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--source\x1b[0m README.md
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--source\x1b[0m README.md --style=./style.css
    \x1b[35mnpx\x1b[0m markdown-to-html-cli \x1b[33m--source\x1b[0m README.md --style='body { color: red; }'
  
`;
