import fs from 'fs-extra';
import path from 'path';
import { unified } from 'unified';
import { ElementContent } from 'hast';
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
import rehypeVideo from 'rehype-video';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { githubCorners } from './nodes/githubCorners';
import { githubCornersFork } from './nodes/githubCornersFork';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';
import { MDToHTMLOptions } from './';

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
// export const _dirname = dirname(fileURLToPath(import.meta.url));
export const _dirname = __dirname;
export interface CreateOptions extends MDToHTMLOptions { }

const script = `function copied(target, str) {
  target.classList.add('active');
  copyTextToClipboard(target.dataset.code, function() {
    setTimeout(() => {
      target.classList.remove('active');
    }, 2000);
  });
}`;

const getCodeStr = (data: ElementContent[] = [], code: string = '') => {
  data.forEach((node) => {
    if (node.type === 'text') {
      code += node.value;
    } else if (node.type === 'element' && node.children && Array.isArray(node.children)) {
      code += getCodeStr(node.children);
    }
  });
  return code;
};

export function create(options = {} as MDToHTMLOptions) {
  // default github css.
  const { markdown, document, rewrite, reurls = {}, wrap = { wrapper: 'div.markdown-body' } } = options;
  let cssStr = fs.readFileSync(path.resolve(_dirname, 'styles', 'github.css')).toString();
  if (options['github-corners-fork'] && options['github-corners']) {
    let cssFork = fs.readFileSync(path.resolve(_dirname, 'styles', 'github-fork-ribbon.css')).toString();
    cssStr = `${cssStr}${cssFork}`;
  }
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeVideo)
    .use(rehypeRaw)
    .use(document ? rehypeDocument : undefined, {
      ...document,
      js: [
        ...(document && document.js ? (Array.isArray(document.js) ? document.js : [document.js]) : []),
        'https://unpkg.com/@uiw/copy-to-clipboard/dist/copy-to-clipboard.umd.js'
      ],
      script: [
        ...(document && document.script ? (Array.isArray(document.script) ? document.script : [document.script]) : []),
        script,
      ],
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
        if (node.type == 'element' && node.tagName === 'pre') {
          const code = getCodeStr(node.children);
          node.children.unshift(copyElement(code));
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