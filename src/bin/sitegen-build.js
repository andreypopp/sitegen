#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import makeDebug from 'debug';
import path from 'path';
import {parse, error, log} from './utils';
import {createCompiler} from '../compile';

let args = parse(p => p
    .option('--inline-css', 'Inline CSS bundle into HTML page'));

let [entry] = args.args;

let debug = makeDebug('sitegen:cmd:build');

let compileContent = createCompiler({
  entry,
  output: path.join(path.dirname(entry), 'build'),
  env: 'content',
  inlineCSS: args.inlineCss,
});

let compileAssets = createCompiler({
  entry,
  output: path.join(path.dirname(entry), 'build'),
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
