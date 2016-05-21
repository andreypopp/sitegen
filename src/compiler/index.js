/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';
import webpack from 'webpack';

import {validate as validateRoute} from '../route';
import {
  mergeConfig, defaultConfig, configureWebpack,
  readConfigSync, moduleRequest
} from '../config';

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

  let ctx = {
    basedir: path.dirname(entry),
    env: {
      development: env === 'development',
      production: env === 'production',
      content: env === 'content',
    }
  };

  let siteModule = readConfigSync(entry);

  let site = {
    route: validateRoute(siteModule.route, {basedir: ctx.basedir}),
    configure: siteModule.configure || (() => null),
  };

  let sitegenConfig = {

    site: site,

    context: ctx.basedir,

    entry: [
      ctx.env.development && 'react-hot-loader/patch',
      ctx.env.development && 'webpack-hot-middleware/client',
      moduleRequest(entry, BOOT_LOADER),
    ],

    env: env,

    target: ctx.env.content ? 'node' : 'web',

    bail: ctx.env.content,

    output: {
      path: output || '/build',
      filename: 'bundle.js',
      chunkFilename: 'bundle[name].js',
      publicPath: publicPath,
    },

    babel: {
      plugins: [
        ctx.env.development && BABEL_PLUGIN_REACT_HMR,
      ]
    },

    plugins: [
      new LogProgressPlugin(env),
      new webpack.DefinePlugin({
        '__DEBUG__': __DEBUG__,
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      ctx.env.development && new webpack.optimize.OccurenceOrderPlugin(),
      ctx.env.development && new webpack.HotModuleReplacementPlugin(),
      ctx.env.development && new webpack.NoErrorsPlugin(),
      ctx.env.development && new PromiseAssetsPlugin({
        name: 'promiseBundle',
        then: evalBundle
      }),
      ctx.env.content && new RenderPagePlugin({
        inlineCSS: inlineCSS
      }),
      ctx.env.production && new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
    ]
  };

  let config = configureWebpack(mergeConfig(
    defaultConfig(ctx),
    site.configure(ctx),
    sitegenConfig
  ));

  return webpack(config);
}
