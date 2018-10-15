var webpack = require('webpack')
var merge = require('webpack-merge')
var getBaseConf = require('./webpack.base.conf')
var WebpackMd5Hash = require('webpack-md5-hash');

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const stylusLoader = {
  test: /\.styl(us)?$/,
  loader: ExtractTextPlugin.extract({
    fallback: "vue-style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2 // https://github.com/webpack-contrib/css-loader/tree/v0.28.11#importloaders
        }
      },
      'postcss-loader',
      'stylus-loader',
    ]
  })
}

const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: "vue-style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1 // https://github.com/webpack-contrib/css-loader/tree/v0.28.11#importloaders
        }
      },
      'postcss-loader',
    ]
  })
}

var prodConf = {
  module: {
    rules: [
      stylusLoader,
      cssLoader,
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackMd5Hash()
  ]
}

if (process.env.HOSTALIAS) {
  console.log('HOSTALIAS=', process.env.HOSTALIAS)
  prodConf.devtool = '#eval-source-map'
}

function getProdConf (params) {
  return merge(getBaseConf(params), prodConf)
}

module.exports = getProdConf
