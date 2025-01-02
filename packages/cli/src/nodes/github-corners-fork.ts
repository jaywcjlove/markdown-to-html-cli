import { Element } from 'hast';
import {cssCornersFork} from './github-corners-fork.css.js'

export const githubCornersForkStyle = cssCornersFork

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