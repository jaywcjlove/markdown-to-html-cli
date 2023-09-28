import { Element } from 'hast';

const style = `markdown-style pre .copied {
  display: flex;
  position: absolute;
  cursor: pointer;
  color: #a5afbb;
  top: 6px;
  right: 6px;
  border-radius: 5px;
  background: #82828226;
  padding: 6px;
  font-size: 12px;
  transition: all .3s;
}
markdown-style pre .copied:not(.active) {
  visibility: hidden;
}
markdown-style pre:hover .copied {
  visibility: visible;
}
markdown-style pre:hover .copied:hover {
  background: #4caf50;
  color: #fff;
}
markdown-style pre:hover .copied:active,
markdown-style pre .copied.active {
  background: #2e9b33;
  color: #fff;
}
markdown-style pre .copied .octicon-copy {
  display: block;
}
markdown-style pre .copied .octicon-check {
  display: none;
}
markdown-style pre .active .octicon-copy {
  display: none;
}
markdown-style pre .active .octicon-check {
  display: block;
}`;

export function copyStyle(): Element {
  return {
    type: 'element',
    tagName: 'style',
    properties: {},
    children: [
      {
        type: 'text',
        value: style
      }
    ]
  }
}

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

export function copyScript(): Element {
  return {
    type: 'element',
    tagName: 'script',
    properties: {},
    children: [
      {
        type: 'text',
        value: script
      }
    ]
  }
}

export function copyElement(str: string = ''): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      onclick: 'copied(this)',
      'data-code': str,
      className: 'copied',
    },
    children: [
      {
        type: 'element',
        tagName: 'svg',
        properties: {
          className: 'octicon-copy',
          ariaHidden: 'true',
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          height: 12,
          width: 12,
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              fillRule: 'evenodd',
              d: 'M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'
            },
            children: []
          }, {
            type: 'element',
            tagName: 'path',
            properties: {
              fillRule: 'evenodd',
              d: 'M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'
            },
            children: []
          }
        ]
      },
      {
        type: 'element',
        tagName: 'svg',
        properties: {
          className: 'octicon-check',
          ariaHidden: 'true',
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          height: 12,
          width: 12,
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              fillRule: 'evenodd',
              d: 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z'
            },
            children: []
          }
        ]
      }
    ]
  }
}