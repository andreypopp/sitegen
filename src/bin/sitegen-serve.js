#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import express from 'express';
import makeDebug from 'debug';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import chalk from 'chalk';
import {parse} from './utils';
import {createCompiler} from '../compiler';
import OutputRenderer from './OutputRenderer';

let debug = makeDebug('sitegen:cmd:serve');

let args = parse();
let [entry] = args.args;

let frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let i = 0;

OutputRenderer.manage();

function setFlushInterval() {
  return setTimeout(() => {
    onProgress(1);
  }, 100);
}

let interval = null;
let start = null;
let finish = null;

function onProgress(percent, _msg) {
  OutputRenderer.flush();
  if (percent == 0) {
    start = Date.now();
    finish = null;
    clearTimeout(interval);
  } else if (percent == 1) {
    if (finish === null) {
      finish = Date.now();
    }
    OutputRenderer.render([
      chalk.white('Serving at http://localhost:3000'),
      'Build: ' + chalk.green('done') + ' (' + ((finish - start) / 1000) + 's)'
    ].join('\n'));
    interval = setFlushInterval();
  } else {
    let frame = frames[i = ++i % frames.length];
    OutputRenderer.render([
      chalk.white('Serving at http://localhost:3000'),
      'Build: ' + chalk.blue(frame),
    ].join('\n'));
  }
}

let compiler = createCompiler({
  entry,
  env: 'development',
  publicPath: args.publicPath,
  progress: onProgress,
});

let compileDevMiddleware = WebpackDevMiddleware(compiler, {
  noInfo: false,
  quiet: true,
  stats: {
    chunks: false,
    modules: false,
  },
});

let compileHotMiddleware = WebpackHotMiddleware(compiler, {
  log() { },
});

function render(req, res, next) {
  compiler.promiseBundle.then(
    mod => res.send(renderToStaticMarkup(<mod.Site bundle={{js: '/bundle.js'}} />)),
    err => next(err)
  );
}

express()
  .use(compileDevMiddleware)
  .use(compileHotMiddleware)
  .use(render)
  .listen(3000, () => debug('started listening on port 3000'));
