var webpack = require('webpack')
var path = require('path')
var utils = require('./utils.js')
var config = require('./config.js')

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const imageLoader = utils.getImageLoader(env)
const fontLoader = utils.getFontsLoader(env)
const lessLoader = utils.getLessLoader(env)
const vueLoader = utils.getVueLoader(env, {
  loaders: {
    i18n: '@kazupon/vue-i18n-loader'
  }
})

const jsLoader = utils.getJsLoader(/\.jsx?$/, {
  exclude: /node_modules/,
  include: config.paths.src,
  query: {
    cacheDirectory: path.resolve(config.paths.build, 'tmp')
  }
})

var stylusLoader = utils.getStylusLoaderMaybeWithPlugin(false, env, env)
const jsConfig = {
  name: ' JavaScript '.yellow.bold.inverse,
  target: 'web',
  context: config.paths.root,
  output: {
    path: config[env].assetsRoot,
    filename: env == 'dev' ? '[name].js' : '[name]-[chunkhash].js',
    publicPath: config[env].assetsPublicPath
  },
  entry: utils.getEntries(['.js'], {
    relativePublicPath: 'js/',
  }),
  resolve: {
    extensions: ['.js'],
    alias: config.alias
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },imageLoader, fontLoader, jsLoader, vueLoader, stylusLoader, lessLoader]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    utils.getCopyPlugins(env, config[env].assetsPublicPath)
  ]
}

//stylus
var stylusLoaderAndPlugins = utils.getStylusLoaderMaybeWithPlugin(true, env)
const stylusConfig = {
  name: ' Stylesheet '.cyan.bold.inverse,
  target: 'web',
  context: config.paths.root,
  entry: utils.getEntries(['.styl'], {
    relativePublicPath: 'css/'
  }),
  output: {
    path: config[env].assetsRoot,
    filename: env == 'dev' ? '[name].css' : '[name]-[chunkhash].css',
    publicPath: config[env].assetsPublicPath
  },
  resolve: {
    modules: ["node_modules"]
  },
  module: {
    rules: [imageLoader, fontLoader, stylusLoaderAndPlugins.loader]
  },
  plugins: stylusLoaderAndPlugins.plugins
}

// jade
const jadeLoaderAndPlugins = utils.getJadeLoader(env)
const jadeConfig = {
  name: ' Jade '.magenta.bold.inverse,
  target: 'node',
  context: config.paths.root,
  entry: utils.getJadeEntries(['.jade']),
  output: {
    path: config.paths.views,
    filename: '[name].jade',
    publicPath: config[env].assetsPublicPath
  },
  module: {
    rules: [stylusLoaderAndPlugins.loader,imageLoader, fontLoader, jadeLoaderAndPlugins.loader]
  },
  plugins: jadeLoaderAndPlugins.plugins
}

module.exports = {
  jsConfig,
  stylusConfig,
  jadeConfig
}
