#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import makeDebug from 'debug';
import path from 'path';

import {parse, error} from './utils';
import {createCompiler} from '../compiler';
import ProgressBar from './ProgressBar';
import OutputRenderer from './OutputRenderer';

let cwd = process.cwd();

let args = parse(p => p
  .option('--inline-css', 'Inline CSS bundle into HTML page')
  .option('-o, --output [output]', 'Output directory relative to entry [default: output]')
);

let [entry] = args.args;

if (args.output) {
  args.output = path.join(cwd, args.output);
} else {
  args.output = path.join(path.dirname(entry), 'output');
}

let debug = makeDebug('sitegen:cmd:build');

let contentBar = new ProgressBar('content');
let productionBar = new ProgressBar('assets');

OutputRenderer.manage();

function onProgress(bar, percent, msg) {
  bar.update(msg || 'done', percent);
  OutputRenderer.flush();
  if (contentBar.progress == 1 && productionBar.progress == 1) {
    OutputRenderer.done();
  } else {
    OutputRenderer.render(contentBar.render() + '\n' + productionBar.render());
  }
}

function onFinish(message, err, stats) {
  if (err) {
    error(err);
  } else if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.map(err => error(err, null));
  } else {
    debug(message);
  }
}

let compileContent = createCompiler({
  entry,
  output: args.output,
  env: 'content',
  inlineCSS: args.inlineCss,
  publicPath: args.publicPath,
  progress: onProgress.bind(null, contentBar),
});

let compileAssets = createCompiler({
  entry,
  output: args.output,
  env: 'production',
  inlineCSS: args.inlineCss,
  publicPath: args.publicPath,
  progress: onProgress.bind(null, productionBar),
});

compileContent.run(onFinish.bind(null, 'content build complete'));
compileAssets.run(onFinish.bind(null, 'assets build complete'));
