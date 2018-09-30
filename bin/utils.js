var os = require('os')
var path = require('path')
var glob = require('glob')
var fs = require('fs')
var webpack = require('webpack')
var config = require('./config.js')
var assign = require('object-assign')
var shell = require('shelljs')
var settings = require('../common/settings.js')

function getEntries(extensions, options) {
  const res = {}
  options = options || {}
  const verbose = options.verbose || true
  const srcPath = config.paths.src
  const pagesDir = srcPath + '/pages'
  extensions.forEach(ext => {
    let files = glob.sync(pagesDir + "/*/index" + ext, options) // for example: page/home/index.js
    settings.SUPPORTED_LANGS.forEach(lang => {
      files = files.concat(glob.sync(pagesDir + "/*/" + lang + "/index" + ext, options)) // for example: page/home/en-us/index.js
    })
    files.forEach(function(filepath) {
      // key for example: home/index
      const key = (options.relativePublicPath || '') + path.relative(pagesDir, filepath.substring(0, filepath.lastIndexOf('.')))
      res[key] = filepath
    })
  })

  const extensionsString = extensions.join(' and ')
  if (verbose) {
    console.log(('Entries for ' + extensionsString).cyan.bold)
    for (var k in res) {
      console.log(k.green, '=>\n  ', res[k].yellow)
    }
  }
  if (!Object.keys(res).length) {
    console.error('!!!Got no entry for ' + extensionsString + '!!!')
  }
  return res
}
exports.getEntries = getEntries

const ImageNames = {
  dev: 'img/[path][name].[ext]',
  prod: 'img/[path][name]-[hash:7].[ext]'
}
exports.getImageLoader = function(env, limit) {
  return {
    test: config.imgReg,
    loader: 'url-loader',
    query: {
      emitFile: false, // 这里只负责生成url, copy plugin负责拷贝图片
      context: path.join(config.paths.src),
      limit: limit || 10000,
      name: ImageNames[env]
    }
  }
}

const FontNames = {
  dev: 'fonts/[name].[ext]',
  prod: 'fonts/[name]-[chunkhash].[ext]'
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

const CssNames = {
    dev: '[name].css',
    prod: '[name]-[chunkhash].css'
  }
  /**
   * this loader compile stylus files into css files
   * @param  {Boolean} withPlugin
   * @return {Object} [{test,loader} | {loader,plugins}]
   */
exports.getStylusLoaderMaybeWithPlugin = function(withPlugin, env) {
  const test = /\.styl$/
  if (withPlugin) {
    var ExtractTextPlugin = require('extract-text-webpack-plugin')
    var loaderStr = env == 'dev' ?
      'css-loader!stylus-loader' : 'css-loader?minimize=true!stylus-loader'
    return {
      loader: {
        test: test,
        loader: ExtractTextPlugin.extract({
          use: loaderStr,
          remove: false
        })
      },
      plugins: [
        new ExtractTextPlugin(CssNames[env])
      ]
    }
  } else {
    // plain stylus loader
    // insert css as style node into DOM
    return {
      test: test,
      loader: 'style-loader!css-loader!stylus-loader'
    }
  }
}

exports.getLessLoader = function (env) {
  var loaderStr = env == 'dev' ?
    'style-loader!css-loader!less-loader' : 'style-loader!css-loader?minimize=true!less-loader'
  return {
    test: /\.less$/,
    loader: loaderStr
  }
}

const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier');
exports.getWebpackDevHelperPlugins = function(title, opts) {
  opts = opts || {}
  opts.title = (opts.title || title).replace(ansiRegex, '')
  return [
    new FriendlyErrorsPlugin(),
    new WebpackNotifierPlugin(opts)
  ]
}

var WebpackMd5Hash = require('webpack-md5-hash');
exports.getWebpackProdHelpPlugins = function() {
  const plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackMd5Hash()
  ]
  return plugins
}

var CopyWebpackPlugin = require('copy-webpack-plugin')
exports.getCopyAssetsPlugin = function (env) {
  var imgTpl = env === 'dev' ? '[path][name].[ext]' : '[path][name]-[hash:7].[ext]'
  return new CopyWebpackPlugin([
    /* copy static files, add more if needed */
    {
      context: config.paths.src,
      from: '**/*.+(png|svg|jpg|gif)',
      to: path.join(config[env].assetsRoot, 'img/' + imgTpl),
    },
    {
      from: path.join(config.paths.src, 'common/css/lib'),
      to: path.join(config[env].assetsRoot, 'css/lib')
    },
    {
      from: path.join(config.paths.src, 'common/js/lib'),
      to: path.join(config[env].assetsRoot, 'js/lib')
    },
    {
      from: path.join(config.paths.src, 'common/fonts'),
      to: path.join(config[env].assetsRoot, 'fonts')
    },
    // {
    //   from: path.join(config.paths.src, 'html/sitemap.xml'),
    //   to: path.join(config.paths.views, 'sitemap.xml')
    // },
    // {
    //   from: path.join(config.paths.src, 'html/robots.txt'),
    //   to: path.join(config.paths.views, 'robots.txt')
    // }
  ])
}

exports.getCopyJadePlugin = function (env) {
  var jadeTpl = '[path][name].[ext]'
  var manifest = null
  return new CopyWebpackPlugin([
    // copy jade and add hash to link in production mode
    {
      context: config.paths.src,
      from: '**/*.jade',
      to: path.join(config.paths.build + '/' + env + '/views/' + jadeTpl),
      transform: function (content, filepath) {
        function getHashedFilePath (url) {
          if (!manifest) { // make sure to require once
            function try_require(path) {
              if (fs.existsSync(path)) {
                return require(path)
              } else {
                return {}
              }
            }

            var assetsRoot = config[env].assetsRoot
            var m1 = try_require(path.join(assetsRoot, 'js/manifest-js.json'))
            var m2 = try_require(path.join(assetsRoot, 'css/manifest-stylus.json'))
            var m3 = try_require(path.join(assetsRoot, 'img/manifest-img.json'))

            manifest = assign({}, m1, m2, m3)
            console.log('Process view files')
            console.log('Manifest from previous compilation:')
            for (var file in manifest) {
              console.log(' ' + file.green + ' => \n   ' + manifest[file].yellow)
            }
          }

          // find hashed link in manifest
          var hashed = manifest[url]
          if (hashed) {
            return hashed
          } else {
            if (url.indexOf('/lib/') < 0 &&
              url.indexOf('javascript:;') < 0 &&
              url.indexOf('mailto:') <= 0 &&
              url.indexOf('http') <= 0 &&
              url.indexOf('#{') <= 0) {
                console.warn('Not found ' + url + ' in manifest files'.magenta)
            }
            return url
          }
        }

        if (env === 'dev') return content // not add hash in dev mode

        content = content.toString('utf8')

        // find concerned attr link
        const attributes = ['img:src','script:src','link:href', 'video:src', 'source:src', 'audio:src', 'img:data-src']
        var parseAttr = require("./attr-parser.js");
        var links = parseAttr(content, function(tag, attr) {
          return attributes.indexOf(tag + ":" + attr) >= 0;
        });

        if (links.length) {
          content = content.replace(new RegExp(links.map(l => l.value).join('|'), 'gi'), getHashedFilePath)
        }

        return Buffer.from(content, 'utf8')
      },
    },
  ])
}

exports.safeRm = function (_path) {
  var err = false
  if (_path == "/") err = true
  if (_path.toLowerCase() == os.homedir()) err = true
  if (path.relative(config.paths.root, _path).indexOf('../') == 0) err = true
  if (err) {
    console.error(_path, ' is not contained in project folder, will not remove!')
    return
  } else {
    try {
      console.info('try to remove ', _path)
      shell.rm('-r', _path)
      console.info('done!')
    } catch (err) {
      console.error('FATAL:', err)
    }
  }
}
