var path = require('path');

module.exports = {
  entry: [
    '!!route!./site/index.js',
  ],
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  resolveLoader: {
    root: path.join(__dirname, 'lib/loader'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
