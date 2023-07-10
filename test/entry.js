import { exporter } from '@dbml/core';

import { ErDiagram } from '../lib/index.js';

import source from './example.dbml';

const erd = new ErDiagram({
  container: document.querySelector('body'),
});

const json = exporter.export(source, 'json');

erd.fromJSON(JSON.parse(json));
