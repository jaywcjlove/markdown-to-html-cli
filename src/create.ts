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
import rehypeWrap from 'rehype-wrap';
import rehypeRaw from 'rehype-raw';
import rehypeRewrite from 'rehype-rewrite';
import rehypeAttrs from 'rehype-attr';
// @ts-ignore
import rehypeUrls from 'rehype-urls';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { githubCorners } from './nodes/githubCorners';
import { octiconLink } from './nodes/octiconLink';

import { RunArgvs, MDToHTMLOptions } from './';

export function create(argvs: RunArgvs, options = {} as MDToHTMLOptions) {
  // default github css.
  const cssStr = fs.readFileSync(path.resolve(__dirname, 'github.css'));
  const { markdown } = argvs || {};
  const { document = {}, reurls = {}, wrap = { wrapper: 'div.wmde-markdown' } } = options;
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeUrls, (url: any) => {
      if (reurls[url.href]) {
        url.path = reurls[url.href];
        return url.path;
      }
    })
    .use(rehypeDocument, {
      ...document,
      link: document.link ? document.link : [],
      style: [cssStr.toString(), ...(Array.isArray(document.style) ? document.style : [document.style]) ],
    })
    .use(rehypeFormat)
    .use(rehypeWrap, { ...wrap })
    .use(rehypeRewrite, (node, index, parent) => {
      if (node.type == 'element') {
        const className = node.properties ? (Array.isArray(node.properties.className) ? node.properties.className : [node.properties.className]) : [];
        if(node.type == 'element' && className.includes('wmde-markdown') && argvs['github-corners']) {
          node.children = [githubCorners({ href: argvs['github-corners'] }), ...node.children];
        }
        if (/h(1|2|3|4|5|6)/.test(node.tagName) && node.children && Array.isArray(node.children) && node.children.length > 0) {
          const child = node.children[0];
          if (child && child.type === 'element' && child.properties) {
            child.properties = { class: 'anchor', ...child.properties };
            child.children = [octiconLink()];
          }
        }
      }
    })
    .use(rehypePrism)
    .use(rehypeAttrs, { properties: 'attr' })
    .use(stringify)
    .processSync(markdown)
    .toString();
}