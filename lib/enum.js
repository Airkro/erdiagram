import { grey3, orange0, orange5, orange7 } from 'css-bit/dist/antd-color';

import { Node } from '@antv/x6';

import { LINE_HEIGHT, NODE_WIDTH } from './lib.js';

const Height = LINE_HEIGHT;

export const Enum = Node.define({
  width: NODE_WIDTH,
  height: Height,
  markup: [
    { tagName: 'rect', selector: 'box' },
    { tagName: 'text', selector: 'name' },
    { tagName: 'text', selector: 'mark' },
  ],
  attrs: {
    box: {
      strokeWidth: 1,
      stroke: orange5,
      fill: orange0,
      refWidth: 1,
      refHeight: 2,
    },
    name: {
      fontSize: LINE_HEIGHT / 1.6,
      refX: LINE_HEIGHT * 2.5,
      refY: LINE_HEIGHT / 4,
    },
    mark: {
      fontSize: LINE_HEIGHT / 1.6,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT / 4,
      text: 'Enum',
      fill: orange7,
    },
  },
  ports: {
    groups: {
      row: {
        markup: [
          { tagName: 'rect', selector: 'box' },
          { tagName: 'text', selector: 'value' },
          { tagName: 'text', selector: 'note' },
        ],
        position: {
          name: 'tableRow',
          args: {
            header: Height,
            height: Height,
          },
        },
        attrs: {
          box: {
            width: NODE_WIDTH,
            height: Height,
            strokeWidth: 1,
            stroke: orange5,
            fill: 'white',
          },
          value: {
            ref: 'box',
            refX: LINE_HEIGHT / 3,
            refY: LINE_HEIGHT / 4,
            fontSize: 16,
          },
          note: {
            fill: grey3,
            fontSize: 16,
            ref: 'box',
            refX: LINE_HEIGHT * 5,
            refY: LINE_HEIGHT / 4,
          },
        },
      },
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
    values({ values, ...metadata }) {
      if (values) {
        metadata.ports = {
          ...metadata.ports,
          items: values.map(({ value, note }) => ({
            id: value,
            group: 'row',
            attrs: {
              value: { text: value },
              note: note ? { text: `# ${note}` } : undefined,
            },
          })),
        };
      }

      return metadata;
    },
  },
});
