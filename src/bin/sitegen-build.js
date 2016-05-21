#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import makeDebug from 'debug';
import path from 'path';
import {parse, error} from './utils';
import {createCompiler} from '../compile';

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

let compileContent = createCompiler({
  entry,
  output: args.output,
  env: 'content',
  inlineCSS: args.inlineCss,
});

let compileAssets = createCompiler({
  entry,
  output: args.output,
  env: 'production',
  inlineCSS: args.inlineCss,
});

function onFinish(message, err, stats) {
  if (err) {
    error(err);
  } else if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.map(err => error(err, null));
  } else {
    debug(message);
  }
}

compileContent.run(onFinish.bind(null, 'content build complete'));
compileAssets.run(onFinish.bind(null, 'assets build complete'));
