import fs from 'fs-extra';
import path from 'path';
import minimist, { ParsedArgs } from 'minimist';
import { Options } from 'rehype-document';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import { create, _dirname } from './create';
import { formatConfig } from './utils';

export * from './create';
export * from './utils';

export interface RunArgvs extends Omit<ParsedArgs, '_'>  {
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
  /**
   * rehype-wrap Options
   * Wrap selected elements with a given element
   * https://github.com/mrzmmr/rehype-wrap/tree/2402bcdb8ea25bd0948cda72e96d16e65a18c1e9#options
   */
  wrap?: {
    selector?: string;
    wrapper?: string;
  }
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
      source: opts.s || opts.source || 'README.md',
      markdown: opts.markdown || '',
      description: opts.description || '',
      output: opts.o || opts.output || 'index.html',
    },
  });
  if (argvs.h || argvs.help) {
    console.log(`${cliHelp}${exampleHelp}`);
    return;
  }
  const pkgPath = path.resolve(_dirname, '..', 'package.json')
  if ((argvs.v || argvs.version) && fs.existsSync(pkgPath)) {
    const pkg = fs.readJSONSync(pkgPath);
    console.log(`\n \x1b[35mmarkdown-to-html-cli\x1b[0m v${pkg.version}\n`);
    return pkg.version;
  }
  if (argvs.source && !argvs.markdown) {
    argvs.markdown = fs.readFileSync(path.resolve(argvs.source)).toString();
  }
  const options = formatConfig({ ...opts, ...argvs });
  const output = path.resolve(argvs.output);

  const strMarkdown = create({ ...argvs, ...options });
  fs.writeFileSync(output, strMarkdown);
  console.log(`\nmarkdown-to-html: \x1b[32;1m${path.relative(process.cwd(), output)}\x1b[0m\n`);
}

export const cliHelp: string = `\n  Usage: markdown-to-html [options] [--help|h]

  Options:\n
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
    --title           The \`<title>\` tag is required in HTML documents!
    --version, -v     Show version number
    --help, -h        Displays help information.
`;

export const exampleHelp: string =`\n  Example:

    \x1b[35mnpm\x1b[0m markdown-to-html-cli
    \x1b[35mnpm\x1b[0m markdown-to-html     \x1b[33m--title\x1b[0m="Hello World!"
    \x1b[35mnpm\x1b[0m markdown-to-html     \x1b[33m--config\x1b[0m="config/conf.json"
    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--markdown\x1b[0m="Hello World!"
    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--github-corners\x1b[0m https://github.com/jaywcjlove/markdown-to-html-cli
    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--github-corners\x1b[0m https://github.com/jaywcjlove --github-corners-fork
    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--output\x1b[0m coverage/index.html
    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--source\x1b[0m README.md
  
`;
