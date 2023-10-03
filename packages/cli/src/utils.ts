import fs from 'fs-extra';
import path from 'path';
import { type RunArgvs, type MDToHTMLOptions } from './index.js';

export type Options = Omit<RunArgvs, '_'>

export function formatConfig(opts: Options) {
  let options = { ...opts } as MDToHTMLOptions;
  if (!options.document) {
    options.document = { title: opts.title, meta: [], link: [], style: [] }
  }
  const projectPkg = path.resolve(process.cwd(), opts.config || 'package.json');
  let pgkData: any = {};
  if (fs.existsSync(projectPkg)) {
    pgkData = fs.readJSONSync(projectPkg);
    if (pgkData.name && !options.document.title) {
      options.document.title = pgkData.name;
    }
    if (pgkData.repository && !opts['github-corners']) {
      options['github-corners'] = typeof pgkData.repository === 'string' ? pgkData.repository : pgkData.repository.url;
    }
    if (pgkData['markdown-to-html']) {
      const mth = pgkData['markdown-to-html'] as MDToHTMLOptions;
      const { title, meta, link } = options.document;
      options = { ...options, ...mth, document: { ...options.document, title, meta, link, ...mth.document } }
      if (mth['github-corners']) {
        options['github-corners'] = mth['github-corners'];
      }
    }
  }
  if (opts['github-corners'] && typeof opts['github-corners'] === 'string') {
    options['github-corners'] = opts['github-corners'].replace(/^git[+]/, '')
  }
  if (Array.isArray(options.document.link) && options.favicon) {
    options.document.link.push({ rel: 'icon', href: options.favicon, type: 'image/x-icon' });
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
  return options;
}