/*global __resourceQuery __webpack_public_path__*/

/**
 * this file is in webpack entry, will be packed into bundle and run on client side.
 */

const hotClient = require('webpack-hot-middleware/client' + __resourceQuery)

hotClient.subscribe(function (event) {
  // for support pug hot reload. reload event emit after html-webpack-plugin-after-emit
  if (event.action === 'reload') {
    window.location.reload()
  }
})