const webpack = require('webpack')
const path = require('path')
const utils = require('./utils.js')
const config = require('./config.js')
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const imageLoader = utils.getImageLoader(env)
const fontLoader = utils.getFontsLoader(env)
const jadeLoader = { test: /\.jade$/, loader: 'jade-loader' }

const stylusLoader = {
  test: /\.styl$/,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", 'stylus-loader']
  })
}

const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
  })
}

const vueLoader = utils.getVueLoader(env, {
  preLoaders: {
    jade: 'jade-deps-loader'
  }
})

const jsLoader = utils.getJsLoader(/\.jsx?$/, {
  exclude: /node_modules/,
  include: config.paths.src,
  query: {
    cacheDirectory: path.resolve(config.paths.build, 'tmp')
  }
})

function getBaseConf (params) {
  const outputName = params.outputName // js output path + name
  const entryPath = params.entryPath // js entry path
  const jadeTemplate = entryPath.substring(0, params.entryPath.lastIndexOf('.')) + '.jade'
  const htmlOutput = outputName.substring(0, params.entryPath.lastIndexOf('.')) + '.ejs'
  const entry = {}
  entry[outputName] = entryPath
  return {
    name: ' JavaScript '.yellow.bold.inverse,
    target: 'web',
    context: config.paths.root,
    output: {
      path: config.paths.assetsRoot,
      filename: env == 'dev' ? '[name].js' : '[name].[chunkhash].js',
      publicPath: config.paths.assetsPublicPath
    },
    entry,
    externals: config.externals,
    resolve: {
      alias: config.alias
    },
    module: {
      rules: [cssLoader, imageLoader, fontLoader, jsLoader, vueLoader, stylusLoader, jadeLoader]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new ExtractTextPlugin(env == 'dev' ? '[name].css' : '[name].[contenthash].css'),
      new HtmlWebpackPlugin({
        filename: htmlOutput,
        template: jadeTemplate,
        alwaysWriteToDisk: true,
      }),
      new CopyWebpackPlugin([{
        from: path.join(config.paths.src, 'common/lib'),
        to: path.join(config.paths.assetsRoot, 'common/lib')
      }])
    ]
  }
}

module.exports = getBaseConf
