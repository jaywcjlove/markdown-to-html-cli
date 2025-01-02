import { Element, ElementContent } from 'hast';
import { cssMarkdown } from './markdown-style.css.js';

export const mdStyle = cssMarkdown;

export function markdownStyle(child: ElementContent[], markdownStyleTheme?: 'dark' | 'light', style: string = ''): Element[] {
  const properties: Record<string, string> = {
    style: 'max-width: 960px; margin: 0 auto 60px auto; padding: 8px;' + style,
    className: 'markdown-style',
  }
  if (markdownStyleTheme) {
    properties.mode = markdownStyleTheme;
  }
  return [{
    type: 'element',
    properties,
    tagName: 'div',
    children: child
  }]
}
