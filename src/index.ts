import fs from 'fs-extra';
import path from 'path';
import minimist, { ParsedArgs } from 'minimist';
import { Options } from 'rehype-document';
import { create } from './create';

const pkg = fs.readJSONSync(path.resolve(__dirname, '..', 'package.json'));

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
  }
}

export function run(opts = {} as RunArgvs) {
  const argvs: RunArgvs = minimist(process.argv.slice(2), {
    alias: {
      help: 'h',
      version: 'v',
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
    cliHelp();
    exampleHelp();
    return;
  }
  if (argvs.v || argvs.version) {
    console.log(`\n \x1b[35mmarkdown-to-html-cli\x1b[0m v${pkg.version}\n`);
    return pkg.version;
  }
  if (argvs.source && !argvs.markdown) {
    argvs.markdown = fs.readFileSync(path.resolve(argvs.source)).toString();
  }

  const options = { ...opts, ...argvs, document: { title: argvs.title, meta: [], link: [] } } as MDToHTMLOptions;
  const projectPkg = path.resolve(process.cwd(), 'package.json');

  let pgkData: any = {};
  if (fs.existsSync(projectPkg)) {
    pgkData = fs.readJSONSync(projectPkg);
    if (pgkData.name && !options.document.title) {
      options.document.title = pgkData.name;
    }
    if (pgkData.repository && !argvs['github-corners']) {
      argvs['github-corners'] = typeof pgkData.repository === 'string' ? pgkData.repository : pgkData.repository.url;
    }
    if (pgkData['markdown-to-html']) {
      const mth = pgkData['markdown-to-html'] as MDToHTMLOptions;
      const { title, meta, link } = options.document;
      options.document = { title, meta, link, ...mth.document };
      if (!options.favicon && mth.favicon) {
        options.favicon = mth.favicon;
      }
      if (!options.wrap && mth.wrap) {
        options.wrap = mth.wrap;
      }
      if (mth['github-corners']) {
        argvs['github-corners'] = mth['github-corners'];
      }
      if (mth.reurls) {
        options.reurls = mth.reurls;
      }
    }
  }
  if (argvs['github-corners']) {
    argvs['github-corners'] = argvs['github-corners'].replace(/^git[+]/, '')
  }
  if (Array.isArray(options.document.link) && options.favicon) {
    options.document.link.push({ rel: 'icon', href: options.favicon });
  }
  if (Array.isArray(options.document.meta)) {
    if (options.description) {
      options.document.meta.push({ description: options.description });
    } else if (pgkData.description) {
      options.document.meta.push({ description: pgkData.description });
    }
    if (options.keywords) {
      options.document.meta.push({ keywords: options.keywords });
    } else if (pgkData.keywords && Array.isArray(pgkData.keywords)) {
      options.document.meta.push({ keywords: pgkData.keywords.join(',') });
    }
    if (typeof options.author === 'string') {
      options.document.meta.push({ author: options.author });
    }
  }
  const output = path.resolve(argvs.output);
  const strMarkdown = create(argvs, options);
  fs.writeFileSync(output, strMarkdown);
  console.log(`\nmarkdown-to-html: \x1b[32;1m${path.relative(process.cwd(), output)}\x1b[0m\n`);
}

export function cliHelp() {
  console.log('\n  Usage: markdown-to-html [options] [--help|h]');
  console.log('\n  Options:\n');
  console.log('    --version, -v     ', 'Show version number');
  console.log('    --help, -h        ', 'Displays help information.');
  console.log('    --output, -o      ', 'Output static pages to the specified directory.', 'Default: index.html');
  console.log('    --source, -s      ', 'The path of the target file "README.md".', 'Default: README.md');
  console.log('    --markdown        ', 'Markdown string.');
  console.log('    --description     ', 'Define a description of your web page.');
  console.log('    --favicon         ', 'Add a Favicon to your Site.');
  console.log('    --keywords        ', 'Define keywords for search engines.');
  console.log('    --title           ', 'The `<title>` tag is required in HTML documents!');
  console.log('    --author          ', 'Define the author of a page.');
  console.log('    --github-corners  ', 'Add a Github corner to your project page.');
}

export function exampleHelp() {
  console.log('\n  Example:\n');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html-cli');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html     \x1b[33m--title\x1b[0m="Hello World!"');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--markdown\x1b[0m="Hello World!"');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--github-corners\x1b[0m https://github.com/jaywcjlove/markdown-to-html-cli');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--output\x1b[0m coverage/index.html');
  console.log('    \x1b[35mnpm\x1b[0m markdown-to-html-cli \x1b[33m--source\x1b[0m README.md');
  console.log('\n');
}