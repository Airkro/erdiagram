import { Graph } from '@antv/x6';

import { Enum } from './enum.js';
import { LINE_HEIGHT, mapData } from './lib.js';
import { Project } from './project.js';
import { Ref } from './ref.js';
import { Table } from './table.js';

Graph.registerEdge('project', Project, true);
Graph.registerNode('table', Table, true);
Graph.registerEdge('ref', Ref, true);
Graph.registerEdge('enum', Enum, true);

export class ErDiagram extends Graph {
  constructor(options) {
    super({
      ...options,
      autoResize: true,
      panning: true,
      async: true,
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
      },
    });
  }

  fromJSON(data) {
    super.fromJSON({});
    super.fromJSON(mapData(data));

    setTimeout(() => {
      super.zoomToFit({ padding: 10, maxScale: 1 });
    }, 200);
  }
}
