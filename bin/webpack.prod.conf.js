var webpack = require('webpack')
var merge = require('webpack-merge')
var getBaseConf = require('./webpack.base.conf')
var WebpackMd5Hash = require('webpack-md5-hash');

var prodConf = {
  plugins: [
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
