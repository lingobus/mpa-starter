const webpack = require('webpack')
const path = require('path')
const config = require('./config.js')
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const imageLoader = {
  test: config.imgReg,
  loader: 'url-loader',
  query: {
    emitFile: true,
    context: path.join(config.paths.src),
    limit: 10000,
    // url-loader(use file-loader inside) hash means contenthash: https://github.com/webpack-contrib/file-loader/issues/177
    name: env === 'dev' ? '[path][name].[ext]' : `[path][name].[hash:${config.imgHashLength}].[ext]`
  }
}

const fontLoader = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000,
    // url-loader(use file-loader inside) hash means contenthash: https://github.com/webpack-contrib/file-loader/issues/177
    name: env === 'dev' ? 'common/fonts/[name].[ext]' : `common/fonts/[name].[hash:${config.imgHashLength}].[ext]`
  }
}

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

const jsLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    cacheDirectory: path.resolve(config.paths.build, 'tmp')
  }
}

const pugLoader = {
  test: /\.pug$/,
  oneOf: [
    // this applies to <template lang="pug"> in Vue components
    {
      resourceQuery: /^\?vue/,
      use: ['pug-plain-loader']
    },
    // this applies to pug template file
    {
      use: ['pug-loader']
    },
  ]
}

function getBaseConf (params) {
  const name = params.name
  const outputName = params.outputName // js output path + name
  const entryPath = params.entryPath // js entry path
  const pugTemplate = entryPath.substring(0, params.entryPath.lastIndexOf('.')) + '.pug'
  const htmlOutput = outputName.substring(0, params.entryPath.lastIndexOf('.')) + '.ejs'
  const entry = {}
  entry[outputName] = [entryPath]
  return {
    name,
    target: 'web',
    context: config.paths.root,
    output: {
      path: config.paths.assetsRoot,
      filename: env == 'dev' ? '[name].js' : '[name].[contenthash].js',
      publicPath: config.paths.assetsPublicPath,
    },
    entry,
    externals: config.externals,
    resolve: {
      alias: config.alias
    },
    module: {
      rules: [imageLoader, fontLoader, jsLoader, vueLoader, pugLoader]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: htmlOutput,
        template: pugTemplate,
        alwaysWriteToDisk: true,
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(config.paths.src, 'common/lib'),
          to: path.join(config.paths.assetsRoot, 'common/lib')
        },
        {
          from: path.join(config.paths.src, 'common/fonts'),
          to: path.join(config.paths.assetsRoot, 'common/fonts'),
        }
      ])
    ]
  }
}

module.exports = getBaseConf
