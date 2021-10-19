import { Element } from 'hast';

export function octiconLink(): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      class: 'octicon octicon-link',
    },
    children: []
  }
}
