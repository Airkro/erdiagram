import { GridLayout } from '@antv/layout';

export const LINE_HEIGHT = 30;

export const NODE_WIDTH = LINE_HEIGHT * 9;

const gridLayout = new GridLayout({
  width: 2000,
  height: 800,
  preventOverlap: true,
  preventOverlapPadding: LINE_HEIGHT,
  nodeSize: LINE_HEIGHT * 12.5,
  condense: true,
  workerEnabled: true,
});

const 图例 = {
  note: '这不是真实的表',
  fields: [
    {
      name: '主键',
      pk: true,
      note: '注释',
      type: '类型',
    },
    {
      name: '唯一列',
      unique: true,
      nullable: true,
    },
    {
      name: '不为空',
    },
  ],
};

export function mapData({
  name,
  note,
  tables = {},
  refs = [],
  enums = {},
} = {}) {
  const nodes = [
    ...Object.entries(enums).map(([id, values]) => ({
      shape: 'enum',
      id: `enum-${id}`,
      name: id,
      values,
    })),
    ...Object.entries({ 图例, ...tables }).map(([id, config]) => ({
      shape: 'table',
      id,
      name: id,
      ...config,
    })),
  ];

  if (name || note) {
    nodes.unshift({ shape: 'project', name, note });
  }

  const edges = refs.map(({ name: n, from, to }) => {
    return {
      shape: 'ref',
      name: n,
      from,
      to,
    };
  });

  return gridLayout.layout({
    nodes,
    edges,
  });
}
