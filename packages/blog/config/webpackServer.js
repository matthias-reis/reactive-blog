const path = require('path');

module.exports = {
  target: 'node',
  entry: path.join(__dirname, '../server/renderMiddleware'),
  output: {
    path: process.cwd(),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules\//
      }
    ]
  },
  context: process.cwd(),
  resolve: {
    mainFields: ['server', 'main'],
    extensions: ['.js', '.jsx']
  }
};
