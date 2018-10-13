/*global __resourceQuery __webpack_public_path__*/
const hotClient = require('webpack-hot-middleware/client' + __resourceQuery)

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})