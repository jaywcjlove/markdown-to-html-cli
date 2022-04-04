import { Element, ElementContent } from 'hast';

/**
 * @wcj/markdown-to-html@2.0.1
 * https://github.com/jaywcjlove/markdown-to-html
 */
const scriptString = `const __TEMPLATE__ = document.createElement('template');
__TEMPLATE__.innerHTML = \`
<style>
:host [data-color-mode*='light'] { --color-prettylights-syntax-comment: #6e7781; --color-prettylights-syntax-constant: #0550ae; --color-prettylights-syntax-entity: #8250df; --color-prettylights-syntax-storage-modifier-import: #24292f; --color-prettylights-syntax-entity-tag: #116329; --color-prettylights-syntax-keyword: #cf222e; --color-prettylights-syntax-string: #0a3069; --color-prettylights-syntax-variable: #953800; --color-prettylights-syntax-brackethighlighter-unmatched: #82071e; --color-prettylights-syntax-invalid-illegal-text: #f6f8fa; --color-prettylights-syntax-invalid-illegal-bg: #82071e; --color-prettylights-syntax-carriage-return-text: #f6f8fa; --color-prettylights-syntax-carriage-return-bg: #cf222e; --color-prettylights-syntax-string-regexp: #116329; --color-prettylights-syntax-markup-list: #3b2300; --color-prettylights-syntax-markup-heading: #0550ae; --color-prettylights-syntax-markup-italic: #24292f; --color-prettylights-syntax-markup-bold: #24292f; --color-prettylights-syntax-markup-deleted-text: #82071e; --color-prettylights-syntax-markup-deleted-bg: #FFEBE9; --color-prettylights-syntax-markup-inserted-text: #116329; --color-prettylights-syntax-markup-inserted-bg: #dafbe1; --color-prettylights-syntax-markup-changed-text: #953800; --color-prettylights-syntax-markup-changed-bg: #ffd8b5; --color-prettylights-syntax-markup-ignored-text: #eaeef2; --color-prettylights-syntax-markup-ignored-bg: #0550ae; --color-prettylights-syntax-meta-diff-range: #8250df; --color-prettylights-syntax-brackethighlighter-angle: #57606a; --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f; --color-prettylights-syntax-constant-other-reference-link: #0a3069; --color-fg-default: #24292f; --color-fg-muted: #57606a; --color-fg-subtle: #6e7781; --color-canvas-default: #ffffff; --color-canvas-subtle: #f6f8fa; --color-border-default: #d0d7de; --color-border-muted: hsla(210,18%,87%,1); --color-neutral-muted: rgba(175,184,193,0.2); --color-accent-fg: #0969da; --color-accent-emphasis: #0969da; --color-attention-subtle: #fff8c5; --color-danger-fg: #cf222e; } :host [data-color-mode*='dark'] { --color-prettylights-syntax-comment: #8b949e; --color-prettylights-syntax-constant: #79c0ff; --color-prettylights-syntax-entity: #d2a8ff; --color-prettylights-syntax-storage-modifier-import: #c9d1d9; --color-prettylights-syntax-entity-tag: #7ee787; --color-prettylights-syntax-keyword: #ff7b72; --color-prettylights-syntax-string: #a5d6ff; --color-prettylights-syntax-variable: #ffa657; --color-prettylights-syntax-brackethighlighter-unmatched: #f85149; --color-prettylights-syntax-invalid-illegal-text: #f0f6fc; --color-prettylights-syntax-invalid-illegal-bg: #8e1519; --color-prettylights-syntax-carriage-return-text: #f0f6fc; --color-prettylights-syntax-carriage-return-bg: #b62324; --color-prettylights-syntax-string-regexp: #7ee787; --color-prettylights-syntax-markup-list: #f2cc60; --color-prettylights-syntax-markup-heading: #1f6feb; --color-prettylights-syntax-markup-italic: #c9d1d9; --color-prettylights-syntax-markup-bold: #c9d1d9; --color-prettylights-syntax-markup-deleted-text: #ffdcd7; --color-prettylights-syntax-markup-deleted-bg: #67060c; --color-prettylights-syntax-markup-inserted-text: #aff5b4; --color-prettylights-syntax-markup-inserted-bg: #033a16; --color-prettylights-syntax-markup-changed-text: #ffdfb6; --color-prettylights-syntax-markup-changed-bg: #5a1e02; --color-prettylights-syntax-markup-ignored-text: #c9d1d9; --color-prettylights-syntax-markup-ignored-bg: #1158c7; --color-prettylights-syntax-meta-diff-range: #d2a8ff; --color-prettylights-syntax-brackethighlighter-angle: #8b949e; --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58; --color-prettylights-syntax-constant-other-reference-link: #a5d6ff; --color-fg-default: #c9d1d9; --color-fg-muted: #8b949e; --color-fg-subtle: #484f58; --color-canvas-default: #0d1117; --color-canvas-subtle: #161b22; --color-border-default: #30363d; --color-border-muted: #21262d; --color-neutral-muted: rgba(110,118,129,0.4); --color-accent-fg: #58a6ff; --color-accent-emphasis: #1f6feb; --color-attention-subtle: rgba(187,128,9,0.15); --color-danger-fg: #f85149; } :host { display: block; -webkit-text-size-adjust: 100%; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"; font-size: 16px; line-height: 1.5; word-wrap: break-word; color: var(--color-fg-default); background-color: var(--color-canvas-default); } :host details, :host figcaption, :host figure { display: block; } :host summary { display: list-item; } :host [hidden] { display: none !important; } :host a { background-color: transparent; color: var(--color-accent-fg); text-decoration: none; } :host a:active, :host a:hover { outline-width: 0; } :host abbr[title] { border-bottom: none; text-decoration: underline dotted; } :host b, :host strong { font-weight: 600; } :host dfn { font-style: italic; } :host h1 { margin: .67em 0; font-weight: 600; padding-bottom: .3em; font-size: 2em; border-bottom: 1px solid var(--color-border-muted); } :host mark { background-color: var(--color-attention-subtle); color: var(--color-text-primary); } :host small { font-size: 90%; } :host sub, :host sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } :host sub { bottom: -0.25em; } :host sup { top: -0.5em; } :host img { border-style: none; max-width: 100%; box-sizing: content-box; background-color: var(--color-canvas-default); } :host code, :host kbd, :host pre, :host samp { font-family: monospace,monospace; font-size: 1em; } :host figure { margin: 1em 40px; } :host hr { box-sizing: content-box; overflow: hidden; background: transparent; border-bottom: 1px solid var(--color-border-muted); height: .25em; padding: 0; margin: 24px 0; background-color: var(--color-border-default); border: 0; } :host input { font: inherit; margin: 0; overflow: visible; font-family: inherit; font-size: inherit; line-height: inherit; } :host [type=button], :host [type=reset], :host [type=submit] { -webkit-appearance: button; } :host [type=button]::-moz-focus-inner, :host [type=reset]::-moz-focus-inner, :host [type=submit]::-moz-focus-inner { border-style: none; padding: 0; } :host [type=button]:-moz-focusring, :host [type=reset]:-moz-focusring, :host [type=submit]:-moz-focusring { outline: 1px dotted ButtonText; } :host [type=checkbox], :host [type=radio] { box-sizing: border-box; padding: 0; } :host [type=number]::-webkit-inner-spin-button, :host [type=number]::-webkit-outer-spin-button { height: auto; } :host [type=search] { -webkit-appearance: textfield; outline-offset: -2px; } :host [type=search]::-webkit-search-cancel-button, :host [type=search]::-webkit-search-decoration { -webkit-appearance: none; } :host ::-webkit-input-placeholder { color: inherit; opacity: .54; } :host ::-webkit-file-upload-button { -webkit-appearance: button; font: inherit; } :host a:hover { text-decoration: underline; } :host hr::before { display: table; content: ""; } :host hr::after { display: table; clear: both; content: ""; } :host table { border-spacing: 0; border-collapse: collapse; display: block; width: max-content; max-width: 100%; overflow: auto; } :host td, :host th { padding: 0; } :host details summary { cursor: pointer; } :host details:not([open])>*:not(summary) { display: none !important; } :host kbd { display: inline-block; padding: 3px 5px; font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace; line-height: 10px; color: var(--color-fg-default); vertical-align: middle; background-color: var(--color-canvas-subtle); border: solid 1px var(--color-neutral-muted); border-bottom-color: var(--color-neutral-muted); border-radius: 6px; box-shadow: inset 0 -1px 0 var(--color-neutral-muted); } :host h1, :host h2, :host h3, :host h4, :host h5, :host h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; } :host h2 { font-weight: 600; padding-bottom: .3em; font-size: 1.5em; border-bottom: 1px solid var(--color-border-muted); } :host h3 { font-weight: 600; font-size: 1.25em; } :host h4 { font-weight: 600; font-size: 1em; } :host h5 { font-weight: 600; font-size: .875em; } :host h6 { font-weight: 600; font-size: .85em; color: var(--color-fg-muted); } :host p { margin-top: 0; margin-bottom: 10px; } :host blockquote { margin: 0; padding: 0 1em; color: var(--color-fg-muted); border-left: .25em solid var(--color-border-default); } :host ul, :host ol { margin-top: 0; margin-bottom: 0; padding-left: 2em; } :host ol ol, :host ul ol { list-style-type: lower-roman; } :host ul ul ol, :host ul ol ol, :host ol ul ol, :host ol ol ol { list-style-type: lower-alpha; } :host dd { margin-left: 0; } :host tt, :host code { font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace; font-size: 12px; } :host pre { margin-top: 0; margin-bottom: 0; font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace; font-size: 12px; word-wrap: normal; } :host .octicon { display: inline-block; overflow: visible !important; vertical-align: text-bottom; fill: currentColor; } :host ::placeholder { color: var(--color-fg-subtle); opacity: 1; } :host input::-webkit-outer-spin-button, :host input::-webkit-inner-spin-button { margin: 0; -webkit-appearance: none; appearance: none; }
.token.comment, .token.prolog, .token.doctype, .token.cdata { color: var(--color-prettylights-syntax-comment); } .token.namespace { opacity: 0.7; } .token.tag, .token.selector, .token.constant, .token.symbol, .token.deleted { color: var(--color-prettylights-syntax-entity-tag); } .token.maybe-class-name { color: var(--color-prettylights-syntax-variable); } .token.property-access, .token.operator, .token.boolean, .token.number, .token.selector .token.class, .token.attr-name, .token.string, .token.char, .token.builtin { color: var(--color-prettylights-syntax-constant); } .token.deleted { color: var(--color-prettylights-syntax-markup-deleted-text); } .token.property { color: var(--color-prettylights-syntax-constant); } .token.punctuation { color: var(--color-prettylights-syntax-markup-bold); } .token.function { color: var(--color-prettylights-syntax-entity); } .code-line .token.deleted { background-color: var(--color-prettylights-syntax-markup-deleted-bg); } .token.inserted { color: var(--color-prettylights-syntax-markup-inserted-text); } .code-line .token.inserted { background-color: var(--color-prettylights-syntax-markup-inserted-bg); } .token.variable { color: var(--color-prettylights-syntax-constant); } .token.entity, .token.url, .language-css .token.string, .style .token.string { color: var(--color-prettylights-syntax-string); } .token.color, .token.atrule, .token.attr-value, .token.function, .token.class-name { color: var(--color-prettylights-syntax-string); } .token.rule, .token.regex, .token.important, .token.keyword { color: var(--color-prettylights-syntax-keyword); } .token.coord { color: var(--color-prettylights-syntax-meta-diff-range); } .token.important, .token.bold { font-weight: bold; } .token.italic { font-style: italic; } .token.entity { cursor: help; }
:host [data-catalyst] { display: block; } :host g-emoji { font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"; font-size: 1em; font-style: normal !important; font-weight: 400; line-height: 1; vertical-align: -0.075em; } :host g-emoji img { width: 1em; height: 1em; }
.markdown-body::before { display: table; content: ""; } .markdown-body::after { display: table; clear: both; content: ""; } .markdown-body>*:first-child { margin-top: 0 !important; } .markdown-body>*:last-child { margin-bottom: 0 !important; }
:host a:not([href]) { color: inherit; text-decoration: none; } :host .absent { color: var(--color-danger-fg); } :host .anchor { float: left; padding-right: 4px; margin-left: -20px; line-height: 1; } :host .anchor:focus { outline: none; } :host p, :host blockquote, :host ul, :host ol, :host dl, :host table, :host pre, :host details { margin-top: 0; margin-bottom: 16px; } :host blockquote>:first-child { margin-top: 0; } :host blockquote>:last-child { margin-bottom: 0; } :host sup>a::before { content: "["; } :host sup>a::after { content: "]"; } :host h1 .octicon-link, :host h2 .octicon-link, :host h3 .octicon-link, :host h4 .octicon-link, :host h5 .octicon-link, :host h6 .octicon-link { color: var(--color-fg-default); vertical-align: middle; visibility: hidden; } :host h1:hover .anchor, :host h2:hover .anchor, :host h3:hover .anchor, :host h4:hover .anchor, :host h5:hover .anchor, :host h6:hover .anchor { text-decoration: none; } :host h1:hover .anchor .octicon-link, :host h2:hover .anchor .octicon-link, :host h3:hover .anchor .octicon-link, :host h4:hover .anchor .octicon-link, :host h5:hover .anchor .octicon-link, :host h6:hover .anchor .octicon-link { visibility: visible; } :host h1 tt, :host h1 code, :host h2 tt, :host h2 code, :host h3 tt, :host h3 code, :host h4 tt, :host h4 code, :host h5 tt, :host h5 code, :host h6 tt, :host h6 code { padding: 0 .2em; font-size: inherit; } :host ul.no-list, :host ol.no-list { padding: 0; list-style-type: none; } :host ol[type="1"] { list-style-type: decimal; } :host ol[type=a] { list-style-type: lower-alpha; } :host ol[type=i] { list-style-type: lower-roman; } :host div>ol:not([type]) { list-style-type: decimal; } :host ul ul, :host ul ol, :host ol ol, :host ol ul { margin-top: 0; margin-bottom: 0; } :host li>p { margin-top: 16px; } :host li+li { margin-top: .25em; } :host dl { padding: 0; } :host dl dt { padding: 0; margin-top: 16px; font-size: 1em; font-style: italic; font-weight: 600; } :host dl dd { padding: 0 16px; margin-bottom: 16px; } :host table th { font-weight: 600; } :host table th, :host table td { padding: 6px 13px; border: 1px solid var(--color-border-default); } :host table tr { background-color: var(--color-canvas-default); border-top: 1px solid var(--color-border-muted); } :host table tr:nth-child(2n) { background-color: var(--color-canvas-subtle); } :host table img { background-color: transparent; } :host img[align=right] { padding-left: 20px; } :host img[align=left] { padding-right: 20px; } :host .emoji { max-width: none; vertical-align: text-top; background-color: transparent; } :host span.frame { display: block; overflow: hidden; } :host span.frame>span { display: block; float: left; width: auto; padding: 7px; margin: 13px 0 0; overflow: hidden; border: 1px solid var(--color-border-default); } :host span.frame span img { display: block; float: left; } :host span.frame span span { display: block; padding: 5px 0 0; clear: both; color: var(--color-fg-default); } :host span.align-center { display: block; overflow: hidden; clear: both; } :host span.align-center>span { display: block; margin: 13px auto 0; overflow: hidden; text-align: center; } :host span.align-center span img { margin: 0 auto; text-align: center; } :host span.align-right { display: block; overflow: hidden; clear: both; } :host span.align-right>span { display: block; margin: 13px 0 0; overflow: hidden; text-align: right; } :host span.align-right span img { margin: 0; text-align: right; } :host span.float-left { display: block; float: left; margin-right: 13px; overflow: hidden; } :host span.float-left span { margin: 13px 0 0; } :host span.float-right { display: block; float: right; margin-left: 13px; overflow: hidden; } :host span.float-right>span { display: block; margin: 13px auto 0; overflow: hidden; text-align: right; } :host code, :host tt { padding: .2em .4em; margin: 0; font-size: 85%; background-color: var(--color-neutral-muted); border-radius: 6px; } :host code br, :host tt br { display: none; } :host del code { text-decoration: inherit; } :host pre code { font-size: 100%; } :host pre>code { padding: 0; margin: 0; word-break: normal; white-space: pre; background: transparent; border: 0; } :host .highlight { margin-bottom: 16px; } :host .highlight pre { margin-bottom: 0; word-break: normal; } :host .highlight pre, :host pre { position: relative; padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: var(--color-canvas-subtle); border-radius: 6px; } :host pre code, :host pre tt { display: inline; max-width: auto; padding: 0; margin: 0; overflow: visible; line-height: inherit; word-wrap: normal; background-color: transparent; border: 0; } :host .csv-data td, :host .csv-data th { padding: 5px; overflow: hidden; font-size: 12px; line-height: 1; text-align: left; white-space: nowrap; } :host .csv-data .blob-num { padding: 10px 8px 9px; text-align: right; background: var(--color-canvas-default); border: 0; } :host .csv-data tr { border-top: 0; } :host .csv-data th { font-weight: 600; background: var(--color-canvas-subtle); border-top: 0; } :host .footnotes { font-size: 12px; color: var(--color-fg-muted); border-top: 1px solid var(--color-border-default); } :host .footnotes ol { padding-left: 16px; } :host .footnotes li { position: relative; } :host .footnotes li:target::before { position: absolute; top: -8px; right: -8px; bottom: -8px; left: -24px; pointer-events: none; content: ""; border: 2px solid var(--color-accent-emphasis); border-radius: 6px; } :host .footnotes li:target { color: var(--color-fg-default); } :host .footnotes .data-footnote-backref g-emoji { font-family: monospace; } :host .task-list-item { list-style-type: none; } :host .task-list-item label { font-weight: 400; } :host .task-list-item.enabled label { cursor: pointer; } :host .task-list-item+.task-list-item { margin-top: 3px; } :host .task-list-item .handle { display: none; } :host .task-list-item-checkbox, :host input[type="checkbox"] { margin: 0 .2em .25em -1.6em; vertical-align: middle; } :host .contains-task-list:dir(rtl) .task-list-item-checkbox, :host .contains-task-list:dir(rtl) input[type="checkbox"] { margin: 0 -1.6em .25em .2em; } :host ::-webkit-calendar-picker-indicator { filter: invert(50%); }
</style>
\`;
// See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html
// #reflecting-content-attributes-in-idl-attributes.
const installStringReflection = (obj, attrName, propName = attrName) => {
    Object.defineProperty(obj, propName, {
        enumerable: true,
        get() {
            const value = this.getAttribute(attrName);
            return value === null ? '' : value;
        },
        set(v) {
            this.setAttribute(attrName, v);
        },
    });
};
class MarkdownStyle extends HTMLElement {
    constructor() {
        super();
        this.initTheme = this.getAttribute('theme');
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(__TEMPLATE__.content.cloneNode(true));
        this.warpper = document.createElement('div');
        this.warpper.classList.add('markdown-body');
        this.shadow.appendChild(this.warpper);
        this.setTheme();
        const observer = new MutationObserver(() => {
            Array.prototype.slice.call(this.shadow.host.childNodes).forEach((item) => {
                this.warpper.appendChild(item);
            });
        });
        observer.observe(this.shadow.host, { attributes: true, childList: true });
    }
    setTheme() {
        if (!this.initTheme) {
            const { colorMode } = document.documentElement.dataset;
            this.theme = colorMode;
            if (this.theme === 'undefined') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.theme = 'dark';
                }
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    this.theme = 'light';
                }
            }
        }
        this.warpper.setAttribute('data-color-mode', this.theme);
    }
    connectedCallback() {
        installStringReflection(this, 'theme');
        if (!this.initTheme) {
            this.setTheme();
            const observer = new MutationObserver((mutationsList, observer) => {
                this.theme = document.documentElement.dataset.colorMode;
                this.setTheme();
            });
            // Start observing the target node with the above configuration
            observer.observe(document.documentElement, { attributes: true });
            window.matchMedia('(prefers-color-scheme: light)').onchange = (event) => {
                this.theme = event.matches ? 'light' : 'dark';
                this.setTheme();
            };
            window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
                this.theme = event.matches ? 'dark' : 'light';
                this.setTheme();
            };
        }
    }
}
customElements.define('markdown-style', MarkdownStyle);
`

export function markdownStyle(child: ElementContent[], markdownStyleTheme: 'dark' | 'light'): Element[] {
  const properties: Record<string, string> = {
    style: 'max-width: 960px; margin: 0 auto 60px auto; padding: 8px',
    className: 'markdown-body',
  }
  if (markdownStyleTheme) {
    properties.theme = markdownStyleTheme;
  }
  return [{
    type: 'element',
    tagName: 'script',
    // properties: {
    //   // type: 'module',
    //   // src: 'https://unpkg.com/@wcj/markdown-style?module',
    // },
    children: [{
      type: 'text',
      value: scriptString
    }]
  }, {
    type: 'element',
    properties,
    tagName: 'markdown-style',
    children: child
  }]
}
