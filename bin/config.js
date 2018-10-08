// see http://vuejs-templates.github.io/webpack for documentation.
require('colors')
var path = require('path')
var prettyjson = require('prettyjson')
var buildPath = '../build'

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const envconfigs = {
  port: 8080,
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, buildPath),
    assetsRoot: path.resolve(__dirname, buildPath, env),
    assetsPublicPath: '/static/',
  },
  externals: {
    'axios': 'axios',
    'moment': 'moment',
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vue-i18n': 'VueI18n',
    'vuex': 'Vuex',
    'element-ui': 'Element',
    'lodash': 'lodash',
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
    "pages": path.resolve(__dirname, '../src/pages'),
    "components": path.resolve(__dirname, '../src/common/components'),
    "api": path.resolve(__dirname, '../src/common/js/api'),
    "utils": path.resolve(__dirname, '../src/common/js/utils'),
    "compound-utils": path.resolve(__dirname, '../src/common/compound-utils'),
    "mixin": path.resolve(__dirname, '../src/common/mixin'),
    "img": path.resolve(__dirname, '../src/common/img'),
    "fonts": path.resolve(__dirname, '../src/common/fonts'),
    "common": path.resolve(__dirname, '../common'),
  },
  imgHashLength: 7,
  imgReg: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
}
console.log('Enviroment Configuration:'.magenta.bold)
console.log(prettyjson.render(envconfigs))
module.exports = envconfigs
