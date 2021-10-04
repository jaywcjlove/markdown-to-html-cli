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
import { octiconLink } from './nodes/octiconLink';
import { MDToHTMLOptions } from './';

export interface CreateOptions extends MDToHTMLOptions { }

export function create(options = {} as CreateOptions) {
  // default github css.
  const cssStr = fs.readFileSync(path.resolve(__dirname, 'github.css'));
  const { markdown, document, reurls = {}, wrap = { wrapper: 'div.wmde-markdown' } } = options;
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
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (node.type == 'element') {
          if(node.tagName === 'body' && options['github-corners']) {
            node.children = [githubCorners({ href: options['github-corners'] }), ...node.children];
          }
          if (/h(1|2|3|4|5|6)/.test(node.tagName) && node.children && Array.isArray(node.children) && node.children.length > 0) {
            const child = node.children[0];
            if (child && child.type === 'element' && child.properties) {
              child.properties = { class: 'anchor', ...child.properties };
              child.children = [octiconLink()];
            }
          }
        }
      }
    })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeAttrs, { properties: 'attr' })
    .use(rehypeUrls, (url: any) => {
      if (reurls[url.href]) {
        url.path = reurls[url.href];
        return url.path;
      }
    })
    .use(rehypeFormat)
    .use(stringify)
    .processSync(markdown)
    .toString();
}