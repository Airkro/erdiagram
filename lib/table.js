import { blue5, geekblue0, grey3, red5 } from 'css-bit/dist/antd-color.js';

import { Node } from '@antv/x6';

import { LINE_HEIGHT, NODE_WIDTH } from './lib.js';

const Height = LINE_HEIGHT * 2;

export const Table = Node.define({
  width: NODE_WIDTH,
  height: Height,
  markup: [
    { tagName: 'rect', selector: 'box' },
    { tagName: 'text', selector: 'name' },
    { tagName: 'text', selector: 'note' },
  ],
  attrs: {
    box: {
      strokeWidth: 1,
      stroke: blue5,
      fill: geekblue0,
      refWidth: 1,
      refHeight: 1,
    },
    name: {
      fontSize: LINE_HEIGHT / 1.6,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT / 4,
    },
    note: {
      fill: grey3,
      fontSize: LINE_HEIGHT / 2,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT * 1.2,
      text: '<缺少描述>',
    },
  },
  ports: {
    groups: {
      row: {
        markup: [
          { tagName: 'rect', selector: 'box' },
          { tagName: 'text', selector: 'name' },
          { tagName: 'text', selector: 'type' },
          { tagName: 'text', selector: 'note' },
        ],
        position: {
          name: 'tableRow',
          args: {
            header: Height,
          },
        },
        attrs: {
          box: {
            width: NODE_WIDTH,
            height: LINE_HEIGHT,
            strokeWidth: 1,
            stroke: blue5,
            fill: 'white',
          },
          name: {
            ref: 'box',
            refX: LINE_HEIGHT / 3,
            refY: LINE_HEIGHT / 4,
            fontSize: 16,
          },
          type: {
            ref: 'box',
            refX: LINE_HEIGHT * 5,
            refY: LINE_HEIGHT / 4,
            fontSize: 16,
          },
          note: {
            fill: grey3,
            fontSize: 16,
            ref: 'box',
            refX: LINE_HEIGHT / 3,
            refY: LINE_HEIGHT * 1.125,
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
    note({ note, ...metadata }) {
      if (note) {
        metadata.attrs = {
          ...metadata.attrs,
          note: { text: note },
        };
      }

      return metadata;
    },
    fields({ fields, ...metadata }) {
      if (fields) {
        const list = fields.map(({ name, note, ...rest }) => ({
          ...rest,
          name,
          note,
          height: note ? LINE_HEIGHT * 2 : LINE_HEIGHT,
        }));

        metadata.ports = {
          ...metadata.ports,
          items: list.map(
            ({
              name,
              type,
              note,
              height,
              pk,
              unique,
              nullable = false,
              isEnum = false,
            }) => ({
              id: name,
              group: 'row',
              args: {
                header: Height,
                height,
              },
              attrs: {
                box: {
                  height,
                },
                name: {
                  text: pk ? `${name} 🔑` : name,
                  fill: unique ? red5 : undefined,
                },
                type: {
                  text: type ? (isEnum ? `[${type}]` : type) : 'any',
                  fill: nullable ? undefined : blue5,
                },
                note: note ? { text: `# ${note}` } : undefined,
              },
            }),
          ),
        };
      }

      return metadata;
    },
  },
});
