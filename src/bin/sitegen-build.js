/**
 * @copyright 2016-present, Sitegen team
 */

import makeDebug from 'debug';
import path from 'path';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import evaluate from 'eval';
import {parse, error, log} from './utils';
import Site from '../Site';
import {createCompiler} from '../compile';

let args = parse();
let [entry] = args.args;

let debug = makeDebug('sitegen:cmd:build');

let compileContent = createCompiler({
  entry,
  output: path.join(path.dirname(entry), 'build'),
  env: 'content',
});

function forEachPath(route, func, trace = ['']) {
  let path = '/' + trace.filter(Boolean).join('/');
  if (route.params) {
    Object.keys(route.params).forEach(key => {
      route.params[key].forEach(value => {
        func(interpolateParams(path, {[key]: value}));
      });
    });
  } else {
    func(path);
  }
  if (route.childRoutes) {
    route.childRoutes.forEach(route =>
      forEachPath(route, func, trace.concat(route.path)));
  }
}

function interpolateParams(path, params) {
  return path.replace(/:([a-zA-Z_\-]+)/g, (_, key) => params[key]);
}

export default class RenderStaticPlugin {

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      let bundle = compilation.assets['bundle.js'];
      let source = bundle._source ?
        bundle._source.source() :
        bundle.source();
      let scope = {
        console,
        process,
        require,
        setTimeout,
      };
      let route = evaluate('module.exports = ' + source, '<bootstrap>', scope).route;

      cleanAssets(compilation.assets);

      function addToAssets(path, markup) {
        compilation.assets[routePathToAssetPath(path)] = createAssetFromContents(markup);
      }

      let tasks = [];
      forEachPath(route, path => {
        debug('rendering path', path);
        tasks.push(
          this.renderPath(route, path).then(
            markup => {
              if (markup) {
                addToAssets(path, markup)
              }
            },
            error => {
              debug('error while rendering path', path);
              throw error;
            })
        );
      });

      Promise.all(tasks).then(
        () => {
          done();
        },
        err => {
          compilation.errors.push(err);
          done(err);
        });
    });
  }

  renderPath(route, path) {
    return new Promise((resolve, reject) => {
      let location = path;
      match({routes: route, location}, (error, redirectLocation, routeProps) => {
        if (error) {
          reject(error);
        } else if (!routeProps || redirectLocation) {
          resolve(null);
        } else {
          let innerMarkup = renderToString(<RouterContext {...routeProps} />);
          let markup = renderToStaticMarkup(
            <Site
              bundle={{js: '/bundle.js'}}
              content={innerMarkup}
              />
          );
          resolve(markup);
        }
      });
    });
  }
}

function createAssetFromContents(contents) {
  return {
    source() {
      return contents;
    },
    size() {
      return contents.length;
    }
  };
}

function routePathToAssetPath(path) {
  path = path.replace(/^\//, '').replace(/\/$/, '');
  return path + '/index.html';
}

function cleanAssets(assets) {
  Object.keys(assets).forEach(key => delete assets[key]);
}

new RenderStaticPlugin().apply(compileContent);

compileContent.run(function(err, stats) {
  if (err) {
    error(err);
  } else if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.map(err => error(err, null));
  } else {
    debug('content build finished');
  }
});

let compileProd = createCompiler({
  entry,
  output: path.join(path.dirname(entry), 'build'),
  env: 'production',
});


compileProd.run(function(err, stats) {
  if (err) {
    error(err);
  } else if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.map(err => error(err, null));
  } else {
    debug('production build finished');
  }
});
