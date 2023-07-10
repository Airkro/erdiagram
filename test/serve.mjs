import htmlPlugin from '@chialab/esbuild-plugin-html';
import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
  entryPoints: ['test/index.html'],
  outdir: 'dist',
  bundle: true,
  loader: { '.dbml': 'text' },
  plugins: [htmlPlugin()],
});

await ctx.watch();

const { host, port } = await ctx.serve({
  servedir: 'dist',
});

console.log('On', host, port);
