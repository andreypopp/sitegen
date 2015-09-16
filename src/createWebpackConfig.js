import webpack            from 'webpack';
import RenderStaticPlugin from './RenderStaticPlugin';
import LogProgressPlugin  from './LogProgressPlugin';

let skip = require.resolve('./loaders/skip');

const defaultOptions = {
  mode: 'serve',
  dev: false,
};

export default function createWebpackConfig(options = {}) {
  let plugins = [
    new LogProgressPlugin(options.compilerName),
    options.mode === 'build' && new RenderStaticPlugin(),
    options.mode === 'serve' && options.dev && new webpack.optimize.OccurenceOrderPlugin(),
    options.mode === 'serve' && options.dev && new webpack.HotModuleReplacementPlugin(),
    options.mode === 'serve' && options.dev && new webpack.NoErrorsPlugin(),
  ];
  let entry = [
    options.mode === 'serve' && options.dev && skip + '!webpack-hot-middleware/client?reload=true',
    options.entry
  ];
  return {
    entry: entry.filter(Boolean),
    target: options.mode === 'build' ? 'node' : 'web',
    sitegen: options,
    babel: options.mode === 'serve' && options.dev && {
      plugins: [
        "react-transform"
      ],
      extra: {
        "react-transform": [{
          target: "react-transform-webpack-hmr",
          imports: ["react"],
          locals: ["module"]
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
      libraryTarget: 'commonjs2',
      path: options.output,
      filename: '_bootstrap.js',
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
        page: require.resolve('./loaders/page'),
      },
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel-loader?stage=0'},
        {test: /\.md$/, loader: 'babel-loader!sitegen-loader-markdown'},
      ]
    }
  };
}
