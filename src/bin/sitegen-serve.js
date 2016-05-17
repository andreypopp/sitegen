/**
 * @copyright 2016-present, Sitegen team
 */

import express from 'express';
import makeDebug from 'debug';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse, error, log} from './utils';
import {createCompiler} from '../compile';

let debug = makeDebug('sitegen:cmd:serve');

let args = parse();
let [entry] = args.args;

let compiler = createCompiler({
  entry,
  env: 'development',
});

let compilerMiddleware = WebpackDevMiddleware(compiler, {
  noInfo: false,
  quiet: true,
  stats: {
    chunks: false,
    modules: false,
  },
});

function render(req, res, next) {
  compiler.promiseBundle.then(
    mod => res.send(renderToStaticMarkup(<mod.Site bundle={{js: '/bundle.js'}} />)),
    err => next(err)
  );
}

let app = express()
  .use(compilerMiddleware)
  .use(render)
  .listen(3000, () => debug('started listening on port 3000'));
