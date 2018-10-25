// see http://vuejs-templates.github.io/webpack for documentation.
require('colors')
const path = require('path')
const prettyjson = require('prettyjson')
const buildPath = '../build'

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const assetsRoot = path.resolve(__dirname, buildPath, env)

const envconfigs = {
  port: process.env.PORT || 8080,
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, buildPath),
    assetsRoot,
    assetsPublicPath: '/static/',
    compilationStatsOutput: path.resolve(assetsRoot, 'compilation-stats.json'),
  },
  externals: {
    'axios': 'axios',
    'moment': 'moment',
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vue-i18n': 'VueI18n',
    'vuex': 'Vuex',
    'element-ui': 'Element',
    'lodash': '_',
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
    "mpa-common-library": path.resolve(__dirname, '../src/mpa-common-library'),
    "pages": path.resolve(__dirname, '../src/pages'),
    "components": path.resolve(__dirname, '../src/common/components'),
    "api": path.resolve(__dirname, '../src/common/api'),
    "utils": path.resolve(__dirname, '../src/common/utils'),
    "mixin": path.resolve(__dirname, '../src/common/mixin'),
    "img": path.resolve(__dirname, '../src/common/img'),
    "fonts": path.resolve(__dirname, '../src/common/fonts'),
    "common": path.resolve(__dirname, '../src/common'),
    "root": path.resolve(__dirname, '..'),
  },
  imgHashLength: 8,
  imgReg: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
}
console.log('Enviroment Configuration:'.magenta.bold)
console.log(prettyjson.render(envconfigs))
module.exports = envconfigs
