/**
 * @copyright 2016-present, Sitegen team
 */

import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse, error, log} from './utils';
import Site from '../Site';
import {createCompiler} from '../compile';

let args = parse();
let [entry] = args.args;

let compiler = createCompiler({
  entry,
  env: 'development',
});

let compilerMiddleware = WebpackDevMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  stats: {
    chunks: false,
    modules: false,
  },
});

function render(req, res, next) {
  res.send(renderToStaticMarkup(
    <Site bundle={{js: '/bundle.js'}} />
  ));
}

let app = express()
  .use(compilerMiddleware)
  .use(render)
  .listen(3000, () => log('started listening on port 3000'));
