import { grey3, orange0, orange5, orange7 } from 'css-bit/dist/antd-color';
import sumBy from 'lodash/sumBy.js';

import { Node } from '@antv/x6';

import { LINE_HEIGHT, NODE_WIDTH } from './lib.js';

const headHeight = LINE_HEIGHT * 1.25;

export const Enum = Node.define({
  width: NODE_WIDTH,
  height: headHeight,
  markup: [
    {
      tagName: 'rect',
      selector: 'box',
    },
    {
      tagName: 'text',
      selector: 'mark',
    },
    {
      tagName: 'text',
      selector: 'name',
    },
  ],
  attrs: {
    box: {
      strokeWidth: 1,
      stroke: orange5,
      fill: orange0,
      refWidth: 1,
      refHeight: 1,
    },
    mark: {
      fontSize: LINE_HEIGHT / 1.6,
      refX: LINE_HEIGHT / 3,
      refY: LINE_HEIGHT / 3,
      text: 'Enum',
      fill: orange7,
    },
    name: {
      fontSize: LINE_HEIGHT / 1.6,
      refX: LINE_HEIGHT * 2.5,
      refY: LINE_HEIGHT / 3,
    },
  },
  ports: {
    groups: {
      row: {
        position: {
          name: 'absolute',
        },
        markup: [
          {
            tagName: 'rect',
            selector: 'box',
          },
          {
            tagName: 'text',
            selector: 'value',
          },
          {
            tagName: 'text',
            selector: 'note',
          },
        ],
        attrs: {
          box: {
            width: NODE_WIDTH,
            height: LINE_HEIGHT,
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
            ref: 'box',
            fill: grey3,
            refX: LINE_HEIGHT * 5,
            refY: LINE_HEIGHT / 4,
            fontSize: 16,
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
        const list = values.map(({ value, note, ...rest }) => ({
          ...rest,
          value,
          note,
          height: LINE_HEIGHT,
        }));

        const list2 = list.map(({ ...rest }, index) => ({
          ...rest,
          y: sumBy(list.slice(0, index), ({ height: h }) => h),
        }));

        metadata.ports = {
          ...metadata.ports,
          items: list2.map(({ value, note, height, y }) => ({
            id: value,
            group: 'row',
            args: {
              y: headHeight + y,
            },
            attrs: {
              box: {
                height,
              },
              value: {
                text: value,
              },
              note: note
                ? {
                    text: note,
                  }
                : undefined,
            },
          })),
        };
      }

      return metadata;
    },
  },
});
