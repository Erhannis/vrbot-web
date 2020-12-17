const webpack = require('webpack');

let PLUGINS = [];
if (process.env.NODE_ENV === 'production') {
  PLUGINS.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  plugins: PLUGINS,
  devServer: {
    disableHostCheck: true
  },
  resolve: {
      fallback: { "util": require.resolve("util/") },
      alias: {
          process: "process/browser"
      }
  }
};