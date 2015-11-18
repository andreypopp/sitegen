import webpack              from 'webpack';
import ExtractTextPlugin    from 'extract-text-webpack-plugin';
import RenderStaticPlugin   from './RenderStaticPlugin';
import LogProgressPlugin    from './LogProgressPlugin';
import QueryAPIBabelPlugin  from './QueryAPIBabelPlugin';

export let JS_BUNDLE_NAME = 'bootstrap.js';
export let CSS_BUNDLE_NAME = 'bootstrap.css';

let babelLoader = require.resolve('babel-loader');
let cssLoader = require.resolve('css-loader');
let cssLoaderLocals = require.resolve('css-loader/locals');
let styleLoader= require.resolve('style-loader');
let fileLoader = require.resolve('file-loader');
let jsonLoader = require.resolve('json-loader');
let urlLoader = require.resolve('url-loader');
let sitegenLoaderMarkdown = require.resolve('sitegen-loader-markdown');
let webpackHotMiddlewareClient = require.resolve('webpack-hot-middleware/client');
let babelPluginReactTransform = require.resolve('babel-plugin-react-transform');
let reactTransformHMR = require.resolve('react-transform-hmr');

export default function createWebpackConfig(options = {}) {
  let build = options.mode === 'build' && !options.dev;
  let serve = options.mode === 'serve' && !options.dev;
  let serveDev = options.mode === 'serve' && options.dev;

  let plugins = [
    new LogProgressPlugin(options.compilerName),
    build && new RenderStaticPlugin(),
    serveDev && new webpack.optimize.OccurenceOrderPlugin(),
    serveDev && new webpack.HotModuleReplacementPlugin(),
    serveDev && new webpack.NoErrorsPlugin(),
    serve && new webpack.optimize.UglifyJsPlugin(),
    (build || serve) && new ExtractTextPlugin(CSS_BUNDLE_NAME, {allChunks: true}),
  ];

  let entry = [
    serveDev && `${webpackHotMiddlewareClient}?reload=true`,
  ].concat(options.entry);

  return {
    entry: entry.filter(Boolean),
    target: build ? 'node' : 'web',
    sitegen: options,
    devtool: serveDev ? 'cheap-module-eval-source-map' : undefined,
    babel: {
      plugins: [
        QueryAPIBabelPlugin,
        serveDev ? babelPluginReactTransform : null
      ].filter(Boolean),
      extra: {
        'react-transform': {
          transforms: [{
            transform: reactTransformHMR,
            imports: ['react'],
            locals: ['module']
          }]
        }
      }
    },
    stats: {
      children: false,
      assets: false,
      hash: false,
      version: false,
      timings: false,
    },
    output: {
      publicPath: options.publicPath || '/',
      library: 'SitegenSite',
      libraryTarget: build ? 'commonjs2' : 'var',
      path: options.output,
      filename: JS_BUNDLE_NAME,
      chunkFilename: '[name].js',
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        ['sitegen/internal']: require.resolve('./internal'),
        ['sitegen']: require.resolve('./'),
        ['site']: options.lib,
      },
    },
    resolveLoader: {
      alias: {
        ['page']: require.resolve('./loaders/page'),
        ['page-id']: require.resolve('./loaders/page-id'),
        ['site']: require.resolve('./loaders/site'),
      },
    },
    module: {
      loaders: [
        // content
        {
          test: /\.json$/,
          loader: jsonLoader,
        },
        {
          test: /\.js$/,
          loader: `${babelLoader}?stage=0`,
          exclude: /node_modules/
        },
        {
          test: /\.md$/,
          loader: `${babelLoader}!${sitegenLoaderMarkdown}`
        },

        // styles
        {
          test: /\.css$/,
          loader: serve ? // eslint-disable-line no-nested-ternary
            ExtractTextPlugin.extract(styleLoader, cssLoader) :
            serveDev ?
            `${styleLoader}!${cssLoader}` :
            cssLoaderLocals
        },

        // images
        {
          test: /\.png$/,
          loader: `${urlLoader}?prefix=img/&limit=5000`
        },
        {
          test: /\.jpg$/,
          loader: `${urlLoader}?prefix=img/&limit=5000`
        },
        {
          test: /\.gif$/,
          loader: `${urlLoader}?prefix=img/&limit=5000`
        },

        // fonts
        {
          test: /\.eot(\?[a-z0-9]+)?$/,
          loader: `${fileLoader}?prefix=font/`
        },
        {
          test: /\.ttf(\?[a-z0-9]+)?$/,
          loader: `${fileLoader}?prefix=font/`
        },
        {
          test: /\.svg(\?[a-z0-9]+)?$/,
          loader: `${fileLoader}?prefix=font/`
        },
        {
          test: /\.woff(\?[a-z0-9]+)?$/,
          loader: `${urlLoader}?prefix=img/&limit=5000`
        },
        {
          test: /\.woff2(\?[a-z0-9]+)?$/,
          loader: `${urlLoader}?prefix=img/&limit=5000`
        }
      ]
    }
  };
}
