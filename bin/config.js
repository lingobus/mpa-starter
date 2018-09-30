// see http://vuejs-templates.github.io/webpack for documentation.
require('colors')
var path = require('path')
var prettyjson = require('prettyjson')
var buildPath = '../build'

const envconfigs = {
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, buildPath),
  },
  externals: {
    'axios': 'axios',
    'moment': 'moment',
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vue-i18n': 'VueI18n',
    'vuex': 'Vuex'
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
  prod: {
    env: {
      NODE_ENV: '"production"'
    },
    port: 8080,
    assetsRoot: path.resolve(__dirname, buildPath, 'prod'),
    assetsPublicPath: '/static/',
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8080,
    assetsRoot: path.resolve(__dirname, buildPath, 'dev'),
    assetsPublicPath: '/static/',
  },
  imgHashLength: 7,
  imgReg: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
}
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
console.log('Enviroment Configuration:'.magenta.bold)
console.log(prettyjson.render(envconfigs[env]))
module.exports = envconfigs
