var path = require('path')
var glob = require('glob')
var config = require('./config.js')
var settings = require('../common/settings.js')

function getEntries(extensions, options) {
  options = options || {}
  extensions = extensions || ['.js']
  const verbose = options.verbose || true
  const srcPath = config.paths.src
  const pagesPath = srcPath + '/pages'
  const res = []
  extensions.forEach(ext => {
    let files = glob.sync(pagesPath + "/*/index" + ext, options) // for example: page/home/index.js
    settings.SUPPORTED_LANGS.forEach(lang => {
      files = files.concat(glob.sync(pagesPath + "/*/" + lang + "/index" + ext, options)) // for example: page/home/en-us/index.js
    })
    files.forEach(function(filepath) {
      const entry = {
        entryPath: filepath,
        outputName: path.relative(srcPath, filepath.substring(0, filepath.lastIndexOf('.')))
      }
      res.push(entry)
    })
  })

  if (verbose) {
    console.log('Entries'.cyan.bold)
    res.forEach(entry => {
      console.log(entry.entryPath.yellow)
    })
  }
  return res
}
exports.getEntries = getEntries

const ImageNames = {
  dev: '[path][name].[ext]',
  prod: '[path][name].[hash:7].[ext]'
}
exports.getImageLoader = function(env, limit) {
  return {
    test: config.imgReg,
    loader: 'url-loader',
    query: {
      emitFile: true,
      context: path.join(config.paths.src),
      limit: limit || 10000,
      name: ImageNames[env]
    }
  }
}

const FontNames = {
  dev: 'common/fonts/[name].[ext]',
  prod: 'common/fonts/[name].[hash:7].[ext]'
}

exports.getFontsLoader = function(env, limit) {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: limit || 10000,
      name: FontNames[env]
    }
  }
}

exports.getJsLoader = function(jsPattern, opts) {
  const config = {
    test: jsPattern || /\.js$/,
    loader: 'babel-loader'
  }
  return Object.assign(config, opts)
}

exports.getVueLoader = function (env, options) {
  const loader = {
    test: /\.vue$/,
    loader: 'vue-loader'
  }
  if (options) {
    loader.options = options
  }
  return loader
}