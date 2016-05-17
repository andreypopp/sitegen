/**
 * @copyright 2016-present, Sitegen team
 */

import webpack from 'webpack';
import createLogger from 'debug';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import evaluate from 'eval';
import {forEachPath} from './route';

const BOOT_LOADER = require.resolve('./loader/boot');
const BABEL_LOADER = require.resolve('babel-loader');

const BABEL_LOADER_CONFIG = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: BABEL_LOADER,
};

export function createCompiler({entry, output, env, dev}) {
  let __DEBUG__ = env === 'production' ? undefined : JSON.stringify(process.env.DEBUG);
  return webpack({
    entry: [BOOT_LOADER, entry].join('!'),
    devtool: env === 'development' ? 'cheap-module-source-map' : undefined,
    env: env,
    target: env === 'content' ? 'node' : 'web',
    output: {
      path: output || '/build',
      filename: 'bundle.js',
      chunkFilename: 'bundle[name].js',
      publicPath: '/',
    },
    module: {
      loaders: [BABEL_LOADER_CONFIG],
    },
    plugins: [
      new LogProgressPlugin(env),
      new webpack.DefinePlugin({
        '__DEBUG__': __DEBUG__,
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      env === 'content' && new RenderStaticPlugin(),
      env === 'production' && new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ].filter(Boolean)
  });
}

class RenderStaticPlugin {

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
      let {route, Meta, Site} = evaluate('module.exports = ' + source, '<boot>', scope);

      cleanAssets(compilation.assets);

      function addToAssets(path, markup) {
        compilation.assets[routePathToAssetPath(path)] = createAssetFromContents(markup);
      }

      let tasks = [];
      forEachPath(route, path => {
        compiler.debug('rendering path', path);
        tasks.push(
          this.renderPath(route, path, Site, Meta).then(
            markup => {
              if (markup) {
                addToAssets(path, markup)
              }
            },
            error => {
              compiler.debug('error while rendering path', path);
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

  renderPath(route, path, Site, Meta) {
    return new Promise((resolve, reject) => {
      let location = path;
      match({routes: route, location}, (error, redirectLocation, routeProps) => {
        if (error) {
          reject(error);
        } else if (!routeProps || redirectLocation) {
          resolve(null);
        } else {
          let innerMarkup = renderToString(<RouterContext {...routeProps} />);
          let meta = Meta.rewind();
          let markup = renderToStaticMarkup(
            <Site
              meta={meta}
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


class LogProgressPlugin {

  constructor(name = 'webpack') {
    this.name = name;
    this.debug = createLogger(`sitegen:compile:${name}`);
    this._notifyOnCompile = true;
  }

  apply(compiler) {
    compiler.debug = this.debug;
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _onDone(stats) {
    if (stats.compilation.errors.length > 0) {
      this.debug('compilation failed');
      stats.compilation.errors.forEach(error => this.debug(error.message));
    } else {
      this.debug('compilation finished');
    }
  }

  _onCompile() {
    if (this._notifyOnCompile) {
      this._notifyOnCompile = false;
      this.debug('compilation started');
    }
  }

  _onInvalid() {
    this.debug('bundled invalidated, recompiling...');
  }
}
