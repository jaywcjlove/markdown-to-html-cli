import { Element } from 'hast';
import fs from 'fs-extra';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cssFilePath = path.join(__dirname, 'github-corners-fork.css');
export const githubCornersForkStyle = fs.readFileSync(cssFilePath, 'utf-8');

interface GithubCorners {
  href?: string;
}

export function githubCornersFork(opts: GithubCorners): Element {
  const { href } = opts;
  if (!href) {
    return;
  }
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      'aria-label': 'Fork me on Github',
      title: 'Fork me on GitHub',
      target: '__blank',
      className: 'github-fork-ribbon',
      'data-ribbon': 'Fork me on GitHub',
      href,
    },
    children: []
  }
}