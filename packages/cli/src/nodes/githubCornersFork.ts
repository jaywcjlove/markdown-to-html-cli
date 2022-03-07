import { Element } from 'hast';

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