/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';
import webpack from 'webpack';

import {
  mergeConfig, defaultConfig, configureWebpack,
  readConfigSync, moduleRequest
} from '../config';

import RenderPagePlugin from './RenderPagePlugin';
import LogProgressPlugin from './LogProgressPlugin';
import PromiseAssetsPlugin from './PromiseAssetsPlugin';
import MetaRegistryPlugin from './MetaRegistryPlugin';
import {evalBundle} from './utils';

const BOOT_LOADER = require.resolve('../loader/boot');
const META_LOADER = require.resolve('../loader/meta');

const REACT_HOT_LOADER_PATCH = require.resolve('react-hot-loader/patch');
const REACT_HOT_LOADER_PLUGIN = require.resolve('react-hot-loader/babel');

const WEBPACK_HOT_CLIENT = require.resolve('webpack-hot-middleware/client');

export function createCompiler({entry, output, publicPath, env, inlineCSS, progress}) {
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

  let site = readConfigSync(entry);

  let sitegenConfig = {

    site: site,

    context: ctx.basedir,

    entry: [
      ctx.env.development && REACT_HOT_LOADER_PATCH,
      ctx.env.development && WEBPACK_HOT_CLIENT,
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
        ctx.env.development && REACT_HOT_LOADER_PLUGIN,
      ]
    },

    resolve: {
      alias: {
        'debug': require.resolve('debug/browser'),
      }
    },

    plugins: [
      progress && new webpack.ProgressPlugin(progress),
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
      new MetaRegistryPlugin({loader: META_LOADER}),
    ],
  };

  let configPipeline = [];
  configPipeline = configPipeline.concat(defaultConfig(ctx));
  configPipeline = configPipeline.concat(site.plugins.map(p => p.configure(ctx)));
  configPipeline = configPipeline.concat(site.configure(ctx), sitegenConfig);

  let config = configureWebpack(mergeConfig(...configPipeline));

  return webpack(config);
}
