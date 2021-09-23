import { githubCorners } from '../src/nodes/githubCorners';

it('githubCorners test case', async () => {
  expect(githubCorners({ })).toBeUndefined();
  expect(Object.keys(githubCorners({ href: 'https://github.com/jaywcjlove/markdown-to-html-cli' }))).toEqual(expect.arrayContaining(['type', 'tagName', 'properties', 'children']));
});
