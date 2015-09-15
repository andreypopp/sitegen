import RenderStaticPlugin from './RenderStaticPlugin';
import LogProgressPlugin  from './LogProgressPlugin';

export default function createWebpackConfig(options = {}) {
  let mode = options.mode || 'web';
  let plugins = [
    new LogProgressPlugin(options.compilerName)
  ];
  if (mode === 'build') {
    plugins.push(new RenderStaticPlugin());
  }
  return {
    entry: options.entry,
    target: mode === 'build' ? 'node' : 'web',
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
    plugins: plugins,
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
        {test: /\.js$/, loader: 'babel-loader?stage=0'}
      ]
    }
  };
}
