import { Element, ElementContent } from 'hast';
import fs from 'fs-extra';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cssFilePath = path.join(__dirname, 'markdown.css');
export const mdStyle = fs.readFileSync(cssFilePath, 'utf-8');

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
