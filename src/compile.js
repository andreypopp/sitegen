/**
 * @copyright 2016-present, Sitegen team
 */

import webpack from 'webpack';
import createLogger from 'debug';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {match, RouterContext} from 'react-router';
import evaluate from 'eval';
import Promise from 'bluebird';
import {forEachPath} from './route';

const BOOT_LOADER = require.resolve('./loader/boot');
const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const FILE_LOADER = require.resolve('file-loader');
const URL_LOADER = require.resolve('url-loader');
const STYLE_LOADER = require.resolve('style-loader');
const REACTDOWN_LOADER = require.resolve('reactdown/webpack');
const CSS_COMPONENT_LOADER = require.resolve('react-css-components/webpack');

const ES2015_BABEL_PRESET = require.resolve('babel-preset-es2015');
const STAGE_1_BABEL_PRESET = require.resolve('babel-preset-stage-1');
const REACT_BABEL_PRESET = require.resolve('babel-preset-react');
const REACT_HOT_BABEL_PLUGIN = require.resolve('react-hot-loader/babel');

export function createCompiler(config) {
  config = configureCompiler(config);
  return webpack(config);
}

export function configureCompiler({entry, output, env, dev, inlineCSS}) {
  let __DEBUG__ = env === 'production'
    ? undefined
    : JSON.stringify(process.env.DEBUG);

  let BABEL_LOADER_CONFIG = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: BABEL_LOADER,
  };

  let IMG_LOADER_CONFIG = {
    test: /\.(png|jpg|jpeg|gif|ico)$/,
    exclude: /node_modules/,
    loader: configureLoader({loader: URL_LOADER, query: {limit: 10000}}),
  };

  let CSS_LOADER_CONFIG = env === 'development'
    ? {
      test: /\.css$/,
      exclude: /\.(module|component)\.css$/,
      loaders: [STYLE_LOADER, CSS_LOADER],
    }
    : {
      test: /\.css$/,
      exclude: /\.(module|component)\.css$/,
      loader: ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER),
    };

  let CSS_MODULE_LOADER_CONFIG = env === 'development'
    ? {
      test: /\.module\.css$/,
      loaders: [STYLE_LOADER, CSS_LOADER + '?modules'],
    }
    : {
      test: /\.module\.css$/,
      loader: ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER + '?modules'),
    };

  let CSS_COMPONENT_LOADER_CONFIG = env === 'development'
    ? {
      test: /\.component\.css$/,
      loader: configureLoader([
        BABEL_LOADER,
        {
          loader: CSS_COMPONENT_LOADER,
          query: {loadCSS: configureLoader([STYLE_LOADER, CSS_LOADER + '?modules']).split('!')},
        }
      ]),
    }
    : {
      test: /\.component\.css$/,
      loader: configureLoader([
        BABEL_LOADER,
        {
          loader: CSS_COMPONENT_LOADER,
          query: {loadCSS: ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER + '?modules').split('!')}
        }
      ])
    };

  let REACTDOWN_LOADER_CONFIG = {
    test: /\.md$/,
    loaders: [BABEL_LOADER, REACTDOWN_LOADER],
  };

  return {
    entry: [
      env === 'development' && 'react-hot-loader/patch',
      env === 'development' && 'webpack-hot-middleware/client',
      [BOOT_LOADER, entry].join('!'),
    ].filter(Boolean),
    devtool: env === 'development' ? 'cheap-module-source-map' : undefined,
    env: env,
    target: env === 'content' ? 'node' : 'web',
    bail: env === 'content',
    output: {
      path: output || '/build',
      filename: 'bundle.js',
      chunkFilename: 'bundle[name].js',
      publicPath: '/',
    },
    module: {
      loaders: [
        BABEL_LOADER_CONFIG,
        CSS_LOADER_CONFIG,
        IMG_LOADER_CONFIG,
        CSS_MODULE_LOADER_CONFIG,
        CSS_COMPONENT_LOADER_CONFIG,
        REACTDOWN_LOADER_CONFIG,
      ],
    },
    babel: {
      presets: [
        ES2015_BABEL_PRESET,
        STAGE_1_BABEL_PRESET,
        REACT_BABEL_PRESET
      ],
      plugins: [
        env === 'development' && REACT_HOT_BABEL_PLUGIN,
      ].filter(Boolean),
    },
    plugins: [
      new LogProgressPlugin(env),
      new webpack.DefinePlugin({
        '__DEBUG__': __DEBUG__,
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      env === 'development' && new webpack.optimize.OccurenceOrderPlugin(),
      env === 'development' && new webpack.HotModuleReplacementPlugin(),
      env === 'development' && new webpack.NoErrorsPlugin(),
      env === 'development' && new PromiseAssetsPlugin({
        name: 'promiseBundle',
        then: evalBundle
      }),
      (env === 'content' || env === 'production') && new ExtractTextPlugin('bundle.css'),
      env === 'content' && new RenderStaticPlugin({
        inlineCSS: inlineCSS
      }),
      env === 'production' && new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ].filter(Boolean)
  };
}

function configureLoader(element) {
  if (Array.isArray(element)) {
    return element.map(configureLoader).join('!');
  } else if (typeof element === 'string') {
    return element;
  } else {
    if (element.query) {
      return element.loader + '?' + JSON.stringify(element.query);
    } else {
      return element.loader;
    }
  }
}

function evalBundle(assets) {
  let source = assetSource(assets['bundle.js']);
  let scope = {
    console,
    process,
    require,
    setTimeout,
  };
  return evaluate('module.exports = ' + source, '<boot>', scope);
}

class PromiseAssetsPlugin {

  constructor({name, then}) {
    this.name = name || 'promiseAssets';
    this.then = then || (assets => assets);
  }

  apply(compiler) {
    let pending;

    let init = () => {
      pending = Promise.pending();
      compiler[this.name] = pending.promise.then(this.then);
    };

    init();

    compiler.plugin('done', ({compilation}) => {
      pending.resolve(compilation.assets);
    });
    compiler.plugin('invalid', init);
  }
}

class RenderStaticPlugin {

  constructor({inlineCSS}) {
    this.inlineCSS = inlineCSS;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      let {route, Meta, Site} = evalBundle(compilation.assets);
      let css = compilation.assets['bundle.css'];

      cleanAssets(compilation.assets);

      function addToAssets(path, markup) {
        compilation.assets[routePathToAssetPath(path)] = createAssetFromContents(markup);
      }

      let tasks = [];
      forEachPath(route, path => {
        compiler.debug('rendering path', path);
        tasks.push(
          this.renderPath(route, path, css, Site, Meta).then(
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

  renderPath(route, path, css, Site, Meta) {
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
              bundle={{js: '/bundle.js', css: !this.inlineCSS && '/bundle.css'}}
              style={this.inlineCSS && assetSource(css)}
              content={innerMarkup}
              />
          );
          resolve(markup);
        }
      });
    });
  }
}

function assetSource(asset) {
  if (!asset) {
    return null;
  }
  return  asset._source
    ? asset._source.source()
    : asset.source();
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
