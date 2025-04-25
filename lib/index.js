import { Graph } from '@antv/x6';

import { Enum } from './enum.js';
import { LINE_HEIGHT, mapData } from './lib.js';
import { Project } from './project.js';
import { Ref } from './ref.js';
import { Table } from './table.js';
import { toJSON } from './to-json.js';

Graph.registerNode('project', Project, true);
Graph.registerNode('table', Table, true);
Graph.registerEdge('ref', Ref, true);
Graph.registerNode('enum', Enum, true);

Graph.registerPortLayout(
  'tableRow',
  (args) =>
    args.map((arg, index, array) => {
      const pre = array.slice(0, index);

      const y = pre.reduce((acc, cur) => acc + cur.height, arg.header);

      return { position: { x: 0, y }, angle: 0 };
    }),
  true,
);

export class ErDiagram extends Graph {
  constructor(options) {
    super({
      ...options,
      autoResize: true,
      panning: true,
      grid: {
        size: LINE_HEIGHT,
        visible: true,
        args: {
          thickness: 2,
        },
        ...options.grid,
      },
      mousewheel: {
        enabled: true,
        ...options.mousewheel,
      },
    });
  }

  fromJSON(data) {
    super.fromJSON({});
    super.fromJSON(mapData(toJSON(data)));
  }
}
