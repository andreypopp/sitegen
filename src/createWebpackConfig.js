import webpack              from 'webpack';
import ExtractTextPlugin    from 'extract-text-webpack-plugin';
import RenderStaticPlugin   from './RenderStaticPlugin';
import LogProgressPlugin    from './LogProgressPlugin';
import QueryAPIBabelPlugin  from './QueryAPIBabelPlugin';

export let JS_BUNDLE_NAME = '_bootstrap.js';
export let CSS_BUNDLE_NAME = '_bootstrap.css';

export default function createWebpackConfig(options = {}) {
  let plugins = [
    new LogProgressPlugin(options.compilerName),
    options.mode === 'build' && new RenderStaticPlugin(),
    options.mode === 'serve' && options.dev && new webpack.optimize.OccurenceOrderPlugin(),
    options.mode === 'serve' && options.dev && new webpack.HotModuleReplacementPlugin(),
    options.mode === 'serve' && options.dev && new webpack.NoErrorsPlugin(),
    !options.dev && new ExtractTextPlugin(CSS_BUNDLE_NAME),
  ];
  let entry = [
    options.mode === 'serve' && options.dev && 'webpack-hot-middleware/client?reload=true',
  ].concat(options.entry);
  return {
    entry: entry.filter(Boolean),
    target: options.mode === 'build' ? 'node' : 'web',
    sitegen: options,
    devtool: options.dev ? 'cheap-module-eval-source-map' : undefined,
    babel: options.mode === 'serve' && options.dev && {
      plugins: [
        QueryAPIBabelPlugin,
        'react-transform',
      ],
      extra: {
        'react-transform': [{
          target: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }]
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
      libraryTarget: options.mode === 'build' ? 'commonjs2' : 'var',
      path: options.output,
      filename: JS_BUNDLE_NAME,
      chunkFilename: '[name].js',
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        sitegen: require.resolve('./'),
        site: options.lib,
      },
    },
    resolveLoader: {
      alias: {
        ['page']: require.resolve('./loaders/page'),
        ['page-link']: require.resolve('./loaders/page-link'),
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
          loader: options.dev ?
            'style-loader!css-loader' :
            ExtractTextPlugin.extract('style-loader', 'css-loader')
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
