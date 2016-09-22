var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = require('./make-webpack-config.js')({
  debug: true,
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
    new ExtractTextPlugin("[name].css")
  ]
}, 'dev')
