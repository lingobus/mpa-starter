const webpack = require('webpack')
const path = require('path')
const config = require('./config.js')
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const imageLoader = {
  test: config.imgReg,
  loader: 'url-loader',
  query: {
    emitFile: true,
    context: path.join(config.paths.src),
    limit: 10000,
    name: env === 'dev' ? '[path][name].[ext]' : '[path][name].[hash:7].[ext]'
  }
}

const fontLoader = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000,
    name: env === 'dev' ? 'common/fonts/[name].[ext]' : 'common/fonts/[name].[hash:7].[ext]'
  }
}

const stylusLoader = {
  test: /\.styl(us)?$/,
  loader: ExtractTextPlugin.extract({
    fallback: "vue-style-loader",
    use: ["css-loader", 'stylus-loader']
  })
}

const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: "vue-style-loader",
    use: [
      "css-loader",
    ]
  })
}

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

const jsLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  include: config.paths.src,
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
  entry[outputName] = entryPath
  return {
    name,
    target: 'web',
    context: config.paths.root,
    output: {
      path: config.paths.assetsRoot,
      filename: env == 'dev' ? '[name].js' : '[name].[chunkhash].js',
      publicPath: config.paths.assetsPublicPath,
    },
    entry,
    externals: config.externals,
    resolve: {
      alias: config.alias
    },
    module: {
      rules: [cssLoader, imageLoader, fontLoader, jsLoader, vueLoader, stylusLoader, pugLoader]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new VueLoaderPlugin(),
      new ExtractTextPlugin(env == 'dev' ? '[name].css' : '[name].[contenthash].css'),
      new HtmlWebpackPlugin({
        filename: htmlOutput,
        template: pugTemplate,
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
