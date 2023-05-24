import fs from 'fs-extra';
import path from 'path';
import { RunArgvs, MDToHTMLOptions } from './index';

export type Options = Omit<RunArgvs, '_'>

export function formatConfig(opts: Options) {
  let options = { ...opts, document: { title: opts.title, meta: [], link: [] } } as MDToHTMLOptions;
  const projectPkg = path.resolve(process.cwd(), opts.config || 'package.json');
  let pgkData: any = {};
  if (fs.existsSync(projectPkg)) {
    pgkData = fs.readJSONSync(projectPkg);
    if (pgkData.name && !options.document.title) {
      options.document.title = pgkData.name;
    }
    if (pgkData.repository && !opts['github-corners']) {
      opts['github-corners'] = typeof pgkData.repository === 'string' ? pgkData.repository : pgkData.repository.url;
    }
    if (pgkData['markdown-to-html']) {
      const mth = pgkData['markdown-to-html'] as MDToHTMLOptions;
      const { title, meta, link } = options.document;
      options = { ...options, ...mth, document: { title, meta, link, ...mth.document } }
      if (mth['github-corners']) {
        opts['github-corners'] = mth['github-corners'];
      }
    }
  }
  if (opts['github-corners'] && typeof opts['github-corners'] === 'string') {
    opts['github-corners'] = opts['github-corners'].replace(/^git[+]/, '')
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