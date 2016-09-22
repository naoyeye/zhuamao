var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = function(customConfig, NODE_ENV) {
  var cssLoader = [
    'css?modules&localIdentName=[name]-[local]-[hash:base64:8]',
    'postcss'
  ]
  if (NODE_ENV === 'production') {
    cssLoader = [
      'css?modules&localIdentName=[hash:base64:8]',
      'postcss'
    ]
  }
  var scssLoader = cssLoader.concat(['sass'])

  var defaultConfig = {
    output: {
      path: './app/static',
      filename: '[name].js',
      chunkFilename: '[chunkhash].js',
      sourceMapFilename: 'debugging/[file].map'
    },
    module: {
      loaders: [
        { 
          'test': /\.css$/, 
          'loader': ExtractTextPlugin.extract('style', cssLoader.join('!')) 
        },
        { 
          'test': /\.scss$/, 
          'loader': ExtractTextPlugin.extract('style', scssLoader.join('!')) 
        },
        {
          'test': /\.(woff|woff2|ttf|eot|otf)$/,
          'loader': 'file?name=fonts/[name].[ext]!static'
        },
        {
          'test': /\.(png|jpg|jpeg|gif)$/i,
          'loader': 'url?limit=250000'
        },
        {
          'test': /\.(js|jsx)$/,
          'exclude': /node_modules/,
          'loader': 'babel-loader',
          'query': {
            'cacheDirectory': false,
            'presets': ["es2015", "stage-0", "react"],
            'plugins': ['transform-decorators-legacy']
          }
        }
      ]
    },
    postcss: function (webpack) {
      return [autoprefixer]
    },
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.web.js'
      ],
      modulesDirectories: [
        'node_modules',
        './app/static_resource',
      ]
    },
    externals: {
    },
    plugins: [],
    target: 'web'
  }

  customConfig.plugins = defaultConfig.plugins.concat(customConfig.plugins||[])

  var result = Object.assign({}, defaultConfig, customConfig)

  return result

}
