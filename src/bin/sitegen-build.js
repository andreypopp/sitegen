#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';

import {parse, error} from './utils';
import {createCompiler} from '../compiler';

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

function onFinish(message, err, stats) {
  if (err) {
    error(err);
  } else {
    let statsReport = stats.toString({
      chunks: false,
      modules: false,
      children: false,
      version: false,
      colors: true,
    });
    console.log('\n' + message); // eslint-disable-line no-console
    console.log(statsReport); // eslint-disable-line no-console
  }
}

let compileContent = createCompiler({
  entry,
  output: args.output,
  env: 'content',
  inlineCSS: args.inlineCss,
  publicPath: args.publicPath,
});

let compileAssets = createCompiler({
  entry,
  output: args.output,
  env: 'production',
  inlineCSS: args.inlineCss,
  publicPath: args.publicPath,
});

compileContent.run(onFinish.bind(null, 'Content build complete!'));
compileAssets.run(onFinish.bind(null, 'Assets build complete!'));
