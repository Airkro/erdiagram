# erDiagram

A viewer of ER diagrams.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/erdiagram
[npm-badge]: https://img.shields.io/npm/v/erdiagram.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/erdiagram
[github-badge]: https://img.shields.io/npm/l/erdiagram.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/erdiagram.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install erdiagram --save
```

## Usage

```js
import { exporter } from '@dbml/core';
import { ErDiagram } from 'erdiagram';

import source from './example.dbml';

const json = exporter.export(source, 'json');

const erd = new ErDiagram({
  container: document.querySelector('#container')
});

erd.fromJSON(JSON.parse(json));
```
