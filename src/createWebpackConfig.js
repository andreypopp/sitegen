import webpack              from 'webpack';
import ExtractTextPlugin    from 'extract-text-webpack-plugin';
import RenderStaticPlugin   from './RenderStaticPlugin';
import LogProgressPlugin    from './LogProgressPlugin';
import QueryAPIBabelPlugin  from './QueryAPIBabelPlugin';

export let JS_BUNDLE_NAME = '_bootstrap.js';
export let CSS_BUNDLE_NAME = '_bootstrap.css';

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
    (build || serve) && new ExtractTextPlugin(CSS_BUNDLE_NAME),
  ];

  let entry = [
    serveDev && 'webpack-hot-middleware/client?reload=true',
  ].concat(options.entry);

  return {
    entry: entry.filter(Boolean),
    target: build ? 'node' : 'web',
    sitegen: options,
    devtool: serveDev ? 'cheap-module-eval-source-map' : undefined,
    babel: {
      plugins: [
        QueryAPIBabelPlugin,
        serveDev ? 'react-transform' : null
      ].filter(Boolean),
      extra: {
        'react-transform': {
          transforms: [{
            transform: 'react-transform-hmr',
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
          loader: 'json-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader?stage=0'
        },
        {
          test: /\.md$/,
          loader: 'babel-loader!sitegen-loader-markdown'
        },

        // styles
        {
          test: /\.css$/,
          loader: serve ?
            ExtractTextPlugin.extract('style-loader', 'css-loader') :
            serveDev ?
            'style-loader!css-loader' :
            'css-loader/locals'
        },

        // images
        {
          test: /\.png$/,
          loader: 'url-loader?prefix=img/&limit=5000'
        },
        {
          test: /\.jpg$/,
          loader: 'url-loader?prefix=img/&limit=5000'
        },
        {
          test: /\.gif$/,
          loader: 'url-loader?prefix=img/&limit=5000'
        },

        // fonts
        {
          test: /\.eot(\?[a-z0-9]+)?$/,
          loader: 'file-loader?prefix=font/'
        },
        {
          test: /\.ttf(\?[a-z0-9]+)?$/,
          loader: 'file-loader?prefix=font/'
        },
        {
          test: /\.svg(\?[a-z0-9]+)?$/,
          loader: 'file-loader?prefix=font/'
        },
        {
          test: /\.woff(\?[a-z0-9]+)?$/,
          loader: 'url-loader?prefix=font/&limit=5000'
        },
        {
          test: /\.woff2(\?[a-z0-9]+)?$/,
          loader: 'url-loader?prefix=font/&limit=5000'
        }
      ]
    }
  };
}
