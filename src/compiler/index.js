/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';
import webpack from 'webpack';

import {mergeConfig, configureWebpack, defaultConfig} from '../config';

import RenderPagePlugin from './RenderPagePlugin';
import LogProgressPlugin from './LogProgressPlugin';
import PromiseAssetsPlugin from './PromiseAssetsPlugin';
import {evalBundle} from './utils';

const BOOT_LOADER = require.resolve('../loader/boot');
const BABEL_PLUGIN_REACT_HMR = require.resolve('react-hot-loader/babel');

export function createCompiler({entry, output, publicPath, env, inlineCSS}) {
  let __DEBUG__ = env === 'production'
    ? undefined
    : JSON.stringify(process.env.DEBUG);

  let basedir = path.dirname(entry);

  let development = env === 'development';
  let production = env === 'production';
  let content = env === 'content';

  let config = mergeConfig(defaultConfig({basedir, env}), {

    context: path.dirname(entry),

    entry: [
      development && 'react-hot-loader/patch',
      development && 'webpack-hot-middleware/client',
      [BOOT_LOADER, entry].join('!'),
    ],

    devtool: development ? 'cheap-module-source-map' : undefined,

    env: env,

    target: content ? 'node' : 'web',

    bail: content,

    output: {
      path: output || '/build',
      filename: 'bundle.js',
      chunkFilename: 'bundle[name].js',
      publicPath: publicPath,
    },

    babel: {
      plugins: [
        development && BABEL_PLUGIN_REACT_HMR,
      ]
    },

    plugins: [
      new LogProgressPlugin(env),
      new webpack.DefinePlugin({
        '__DEBUG__': __DEBUG__,
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      development && new webpack.optimize.OccurenceOrderPlugin(),
      development && new webpack.HotModuleReplacementPlugin(),
      development && new webpack.NoErrorsPlugin(),
      development && new PromiseAssetsPlugin({
        name: 'promiseBundle',
        then: evalBundle
      }),
      content && new RenderPagePlugin({
        inlineCSS: inlineCSS
      }),
      production && new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ]
  });

  let webpackConfig = configureWebpack(config);

  return webpack(webpackConfig);
}

