import { Shape } from '@antv/x6';
import { blue5, cyan0, cyan5, grey1 } from 'css-bit/dist/antd-color.js';

import { LINE_HEIGHT } from './lib.js';

function split({ table, field }) {
  return { cell: table, port: field };
}

function button(distance, text) {
  return {
    name: 'button',
    args: {
      markup: [
        {
          tagName: 'circle',
          attrs: {
            r: 12,
            stroke: blue5,
            strokeWidth: 1,
            fill: 'white',
          },
        },
        {
          tagName: 'text',
          textContent: text === '*' ? 'N' : 1,
          attrs: {
            fontSize: 14,
            textAnchor: 'middle',
            y: '0.4em',
          },
        },
      ],
      distance,
    },
  };
}

export const Ref = Shape.Edge.define({
  zIndex: 0,
  defaultLabel: {
    markup: [
      {
        tagName: 'rect',
        selector: 'name-box',
      },
      {
        tagName: 'text',
        selector: 'name',
      },
    ],
    attrs: {
      name: {
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        fontSize: 16,
      },
      'name-box': {
        ref: 'name',
        fill: cyan0,
        stroke: cyan5,
        strokeWidth: 2,
        rx: 4,
        ry: 4,
        refWidth: '140%',
        refHeight: '140%',
        refX: '-20%',
        refY: '-20%',
      },
    },
  },
  attrs: {
    line: {
      strokeWidth: 2,
      stroke: grey1,
      sourceMarker: false,
      targetMarker: false,
    },
  },
  router: {
    name: 'er',
    args: {
      offset: LINE_HEIGHT,
      direction: 'H',
    },
  },
  /* eslint-disable no-param-reassign */
  propHooks({ from, to, name, ...metadata }) {
    if (from && to) {
      metadata.source = split(from);
      metadata.target = split(to);

      if (name) {
        metadata.labels = [];

        metadata.labels.push({
          attrs: {
            name: {
              text: name,
            },
          },
          position: {
            distance: 0.5,
          },
        });
      }

      if (!metadata.tools?.items) {
        metadata.tools = { items: [] };
      }

      if (from.relation) {
        metadata.tools.items.push(button(60, from.relation));
      }

      if (to.relation) {
        metadata.tools.items.push(button(-60, to.relation));
      }
    }

    return metadata;
  },
});
