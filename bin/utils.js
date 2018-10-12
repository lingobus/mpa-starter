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
      const outputName = path.relative(srcPath, filepath.substring(0, filepath.lastIndexOf('.')))
      const entry = {
        name: outputName.split('/')[1],
        entryPath: filepath,
        outputName,
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