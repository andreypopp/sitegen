/**
 * @copyright 2016-present, Sitegen team
 */

import webpack from 'webpack';

const BOOT_LOADER = require.resolve('./loader/boot');
const BABEL_LOADER = require.resolve('babel-loader');

const BABEL_LOADER_CONFIG = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: BABEL_LOADER,
};

export function createCompiler({entry, output, env, dev}) {
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
  });
}
