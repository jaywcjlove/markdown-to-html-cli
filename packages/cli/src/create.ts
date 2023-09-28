import markdown, { Options } from '@wcj/markdown-to-html';
import { getCodeString } from 'rehype-rewrite';
import rehypeDocument from 'rehype-document';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGemoji from 'remark-gemoji';
// @ts-ignore
import rehypeUrls from 'rehype-urls';
import rehypeFormat from 'rehype-format';
import { githubCorners } from './nodes/github-corners.js';
import { githubCornersFork } from './nodes/github-corners-fork.js';
import { octiconLink } from './nodes/octiconLink.js';
import { imgBase64 as toBase64 } from './nodes/imgBase64.js';
import { markdownStyle } from './nodes/markdown-style.js';
import { copyElement, copyStyle, copyScript } from './nodes/copy.js';
import { darkMode } from './nodes/dark-mode.js';
import { MDToHTMLOptions } from './index.js';

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
// export const _dirname = dirname(fileURLToPath(import.meta.url));
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

export interface CreateOptions extends MDToHTMLOptions {
  sourcePath?: string;
}

export function create(options: MDToHTMLOptions = {}) {
  const { markdown: string, document, 'img-base64': imgBase64 = false, corners = true, rewrite, reurls = {}, 'markdown-style-theme': markdownStyleTheme, 'dark-mode': darkModeTheme = true, 'markdown-style': wrapperStyle } = options;
  const mdOptions: Options = {
    hastNode: false,
    remarkPlugins: [remarkGemoji],
    rehypePlugins: [
      [rehypeUrls, (url: any) => {
        if (reurls[url.href]) {
          url.path = reurls[url.href];
          return url.path;
        }
      }],
      [rehypeSlug],
      [rehypeAutolinkHeadings],
      [rehypeFormat],
    ],
    rewrite: (node, index, parent) => {
      if (node.type === 'element' && node.tagName === 'html') {
        if (markdownStyleTheme) {
          node.properties = node.properties || {};
          node.properties['data-color-mode'] = markdownStyleTheme;
        }
      }
      if ((node.type === 'element' && node.tagName === 'body') || (!document && node.type === 'root')) {
        node.children = markdownStyle(node.children as any, markdownStyleTheme, wrapperStyle);
        darkMode(darkModeTheme, markdownStyleTheme).forEach(item => node.children.unshift(item));
        if (darkModeTheme) {
        }
      }
      if (corners && options['github-corners'] && ((document && node.type == 'element' && node.tagName === 'body') || (!document && node.type === 'root'))) {
        node.children = Array.isArray(node.children) ? node.children : [];
        if (options['github-corners-fork']) {
          node.children.unshift(githubCornersFork({ href: options['github-corners'] }));
        } else {
          githubCorners({ href: options['github-corners'] }).forEach(item => {
            node.children.unshift(item)
          });
        }
      }
      if (node.type == 'element' && node.tagName === 'img' && imgBase64) {
        node.properties = { ...node.properties, src: toBase64(node.properties.src as string, options.sourcePath) };
      }
      if (node.type == 'element' && /h(1|2|3|4|5|6)/.test(node.tagName) && node.children && Array.isArray(node.children) && node.children.length > 0) {
        const child = node.children[0];
        if (child && child.type === 'element' && child.properties) {
          child.properties = { className: 'anchor', ...child.properties };
          child.children = [octiconLink()];
        }
      }
      if (node.type == 'element' && node.tagName === 'markdown-style') {
        node.children.push(copyStyle());
        node.children.push(copyScript());
      }
      if (node.type == 'element' && node.tagName === 'pre') {
        const code = getCodeString(node.children);
        node.children.push(copyElement(code));
      }
      if (rewrite && typeof rewrite === 'function') {
        rewrite(node, index, parent);
      }
    }
  }
  
  if (document) {
    const documentOptions = { ...document };
    if (document.js) {
      documentOptions.js = Array.isArray(document.js) ? document.js : [document.js];
    }

    if (document.script) {
      documentOptions.script = Array.isArray(document.script) ? document.script : [document.script];
    }

    if (document.link) {
      documentOptions.link = Array.isArray(document.link) ? document.link : [document.link];
    }

    if (document.style) {
      documentOptions.style = Array.isArray(document.style) ? document.style : [document.style];
    }

    mdOptions.rehypePlugins.unshift([rehypeDocument, documentOptions]);
  }

  return markdown(string || '', mdOptions) as string;
}