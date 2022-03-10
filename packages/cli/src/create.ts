import fs from 'fs';
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
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

export const _dirname = __dirname;
export interface CreateOptions extends MDToHTMLOptions { }

const script = `/*! @uiw/copy-to-clipboard v1.0.12 | MIT (c) 2021 Kenny Wang | https://github.com/uiwjs/copy-to-clipboard.git */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).copyTextToClipboard=t()}(this,(function(){"use strict";return function(e,t){const o=document.createElement("textarea");o.value=e,o.setAttribute("readonly",""),o.style={position:"absolute",left:"-9999px"},document.body.appendChild(o);const n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);o.select();let c=!1;try{c=!!document.execCommand("copy")}catch(e){c=!1}document.body.removeChild(o),n&&document.getSelection&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n)),t&&t(c)}}));

function copied(target, str) {
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
  const { markdown, document, rewrite, reurls = {}, wrap = { wrapper: 'div.markdown-body' } } = options;
  
  // default github css.
  const cssPath = path.resolve(_dirname, '..', 'github.css');
  const cssForkPath = path.resolve(_dirname, '..', 'github-fork-ribbon.css');
  let cssStr = '';
  if (fs.existsSync(cssPath)) {
    cssStr = fs.readFileSync(cssPath).toString();
  }
  if (options['github-corners-fork'] && options['github-corners'] && fs.existsSync(cssForkPath)) {
    let cssFork = fs.readFileSync(cssForkPath).toString();
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
          node.children.push(copyElement(code));
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