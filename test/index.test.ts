import { githubCorners } from '../src/nodes/githubCorners';
import { cliHelp, exampleHelp, run } from '../src';

it('githubCorners test case', async () => {
  expect(githubCorners({ })).toBeUndefined();
  expect(Object.keys(githubCorners({ href: 'https://github.com/jaywcjlove/markdown-to-html-cli' }))).toEqual(expect.arrayContaining(['type', 'tagName', 'properties', 'children']));
});

it('cliHelp test case', async () => {
  expect(cliHelp()).toBeUndefined();
  expect(exampleHelp()).toBeUndefined();
  expect(run()).toBeUndefined();
  expect(run({ help: true })).toBeUndefined();
  expect(typeof run({ v: true })).toEqual('string');
});

it('description options test case', async () => {
  expect(run({ description: 'description test case.' })).toBeUndefined();
});


it('description options test case', async () => {
  expect(require('../src/cli')).toEqual({})
});

