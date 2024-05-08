import { green0, green5, grey3 } from 'css-bit/dist/antd-color.js';

import { Node } from '@antv/x6';

import { LINE_HEIGHT, NODE_WIDTH } from './lib.js';

export const Project = Node.define({
  width: NODE_WIDTH,
  height: LINE_HEIGHT * 3,
  markup: [
    {
      tagName: 'rect',
      selector: 'box',
    },
    {
      tagName: 'text',
      selector: 'name',
    },
    {
      tagName: 'text',
      selector: 'note',
    },
  ],
  attrs: {
    box: {
      strokeWidth: 1,
      stroke: green5,
      fill: green0,
      refWidth: 1,
      refHeight: 1,
    },
    name: {
      fontSize: LINE_HEIGHT / 1.2,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT / 3,
    },
    note: {
      fill: grey3,
      fontSize: LINE_HEIGHT / 2,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT * 1.75,
      text: '<缺少描述>',
    },
  },
  propHooks: {
    name({ name, ...metadata }) {
      if (name) {
        metadata.attrs = {
          ...metadata.attrs,
          name: { text: name },
        };
      }

      return metadata;
    },
    note({ note, ...metadata }) {
      if (note) {
        metadata.attrs = {
          ...metadata.attrs,
          note: { text: `# ${note}` },
        };
      }

      return metadata;
    },
  },
});
