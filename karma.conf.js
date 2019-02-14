// Karma configuration
// Generated on Wed Dec 12 2018 13:21:42 GMT+0800 (GMT+08:00)

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/common/lib/vue@2.5.7/vue.js', watched: false},
      {pattern: 'src/common/lib/element-ui@2.4.8/element-ui.js', watched: false},
      {pattern: 'src/common/lib/element-ui@2.4.8/theme-chalk.css', watched: false},
      {pattern: 'test/*.spec.js', watched: true},
      {pattern: 'test/*/*.spec.js', watched: true},
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.spec.js': [ 'webpack' ],
      'test/*/*.spec.js': [ 'webpack' ],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      mode: 'development',
      devtool: '#eval-source-map',
      externals: {
        'vue': 'Vue',
        'element-ui': 'Element',
      },
      resolve: {
        alias: {
          "mpa-common-library": path.resolve(__dirname, './src/mpa-common-library'),
        },
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/,
          },
          {
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
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
          },
          {
            test: /\.styl(us)?$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'stylus-loader',
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
          }
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
      ],
      // webpack configuration
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
