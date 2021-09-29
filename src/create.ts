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
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { githubCorners } from './nodes/githubCorners';
import { octiconLink } from './nodes/octiconLink';

import { RunArgvs, MDToHTMLOptions } from './';

export function create(argvs: RunArgvs, options: MDToHTMLOptions = {}) {
  // default github css.
  const cssStr = fs.readFileSync(path.resolve(__dirname, 'github.css'));
  const { markdown } = argvs || {};
  const { document = {}, wrap = { wrapper: 'div.wmde-markdown' } } = options;
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeDocument, {
      ...document,
      style: [cssStr.toString(), ...(Array.isArray(document.style) ? document.style : [document.style]) ],
    })
    .use(rehypeFormat)
    .use(rehypeWrap, { ...wrap })
    .use(rehypeRewrite, (node, index, parent) => {
      const className = node.properties ? (node.properties as any).className || [] : [];
      if(node.type == 'element' && className.includes('wmde-markdown') && argvs['github-corners']) {
        node.children = [githubCorners({ href: argvs['github-corners'] }), ...(node.children as Array<any>)];
      }

      if (node.type === 'element' && /h(1|2|3|4|5|6)/.test((node as any).tagName) && Array.isArray(node.children)) {
        const child = node.children && node.children[0];
        if (child && child.properties) {
          child.properties = { class: 'anchor', ...child.properties };
          child.children = [octiconLink()];
        }
      }
    })
    .use(rehypePrism)
    .use(rehypeAttrs, { properties: 'attr' })
    .use(stringify)
    .processSync(markdown)
    .toString();
}