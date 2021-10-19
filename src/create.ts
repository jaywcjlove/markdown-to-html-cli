import fs from 'fs-extra';
import path from 'path';
import { unified } from 'unified';
import rehypeDocument from 'rehype-document';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import stringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeFormat from 'rehype-format';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// @ts-ignore
import rehypeUrls from 'rehype-urls';
// @ts-ignore
import rehypeWrap from 'rehype-wrap';
import rehypeRaw from 'rehype-raw';
import rehypeRewrite from 'rehype-rewrite';
import rehypeAttrs from 'rehype-attr';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { githubCorners } from './nodes/githubCorners';
import { githubCornersFork } from './nodes/githubCornersFork';
import { octiconLink } from './nodes/octiconLink';
import { MDToHTMLOptions } from './';

export interface CreateOptions extends MDToHTMLOptions { }

export function create(options = {} as MDToHTMLOptions) {
  // default github css.
  const { markdown, document, rewrite, reurls = {}, wrap = { wrapper: 'div.markdown-body' } } = options;
  let cssStr = fs.readFileSync(path.resolve(__dirname, 'styles', 'github.css')).toString();
  if (options['github-corners-fork'] && options['github-corners']) {
    let cssFork = fs.readFileSync(path.resolve(__dirname, 'styles', 'github-fork-ribbon.css')).toString();
    cssStr = `${cssStr}${cssFork}`;
  }
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(document ? rehypeDocument : undefined, {
      ...document,
      link: document && document.link ? (Array.isArray(document.link) ? document.link : [document.link]) : [],
      style: [cssStr.toString().replace(/\n/g, ''), ...(document ? (Array.isArray(document.style) ? document.style : [document.style]) : []) ],
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeWrap, { ...wrap })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeAttrs, { properties: 'attr' })
    .use(rehypeUrls, (url: any) => {
      if (reurls[url.href]) {
        url.path = reurls[url.href];
        return url.path;
      }
    })
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (options['github-corners'] && ((document && node.type == 'element' && node.tagName === 'body') || (!document && node.type === 'root'))) {
          node.children = Array.isArray(node.children) ? node.children : [];
          if (options['github-corners-fork']) {
            node.children.unshift(githubCornersFork({ href: options['github-corners'] }));
          } else {
            node.children.unshift(githubCorners({ href: options['github-corners'] }));
          }
        }
        if (node.type == 'element' && /h(1|2|3|4|5|6)/.test(node.tagName) && node.children && Array.isArray(node.children) && node.children.length > 0) {
          const child = node.children[0];
          if (child && child.type === 'element' && child.properties) {
            child.properties = { className: 'anchor', ...child.properties };
            child.children = [octiconLink()];
          }
        }
        if (rewrite && typeof rewrite === 'function') {
          rewrite(node, index, parent);
        }
      }
    })
    .use(rehypeFormat)
    .use(stringify)
    .processSync(markdown)
    .toString();
}