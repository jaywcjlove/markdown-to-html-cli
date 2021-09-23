import fs from 'fs-extra';
import path from 'path';
import { unified } from 'unified';
import rehypeDocument from 'rehype-document';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import stringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
// @ts-ignore
import rehypeWrap from 'rehype-wrap';
import rehypeRewrite from 'rehype-rewrite';
import rehypeAttrs from 'rehype-attr';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { githubCorners } from './nodes/githubCorners';

import { RunArgvs, MDToHTMLOptions } from './';

export function create(argvs: RunArgvs, options: MDToHTMLOptions = {}) {
  // default github css.
  const cssStr = fs.readFileSync(path.resolve(__dirname, 'github.css'));
  const { markdown } = argvs || {};
  const { document = {}, wrap = { wrapper: 'div.wmde-markdown' } } = options;
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
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
    })
    .use(rehypePrism)
    .use(rehypeAttrs, { properties: 'attr' })
    .use(stringify)
    .processSync(markdown)
    .toString();
}