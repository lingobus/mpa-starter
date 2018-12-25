require('colors')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const useragent = require('express-useragent')

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const proxy = require('./proxy.js')
const config = require('./bin/config.js')
const PackageConfig = require('./package.json')
const staticPath = config.paths.assetsRoot
const DEFAULT_SEO = require('./common/settings.js').DEFAULT_SEO

console.log('Using Node %s'.green.bold, process.version)
console.log(('Static Directory set to:\n  '.magenta.bold + staticPath).green)

const app = express()
app.set('views', config.paths.build + '/' + env + '/pages')
app.set('view engine', 'pug')

if (env === 'dev') {
  console.log('Using Development Env Config'.cyan.inverse)
  if (process.env.HMR) {
    console.log('Using HMR')
    require('./bin/hmr.js')(app)
  }
  app.locals.isdev = true
  app.locals.pretty = true
  app.use(morgan('dev'))
} else {
  console.log('Using Production Env Config'.red.inverse)
  app.locals.isdev = false
  app.locals.pretty = false
}

app.use(require('./mock'))

// proxy(app)
proxy(app)
app.use(useragent.express())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
/* server static files */
app.use('/static', express.static(staticPath))

/* middleware */
require('./middlewares')(app)
/* controllers */
require('./controllers')(app)

/* 404 */
app.use(function(req, res) {
  console.log(('404:' + req.path).yellow)
  res.status(404);
  res.render('404', DEFAULT_SEO)
})

/* 500 */
app.use(function(error, req, res, next) {
  console.log(('500:' + req.path).yellow)
  res.status(500);
  console.log(error)
  res.render('500', Object.assign({}, DEFAULT_SEO, { error: error }))
})

const port = config.port
app.listen(port, function() {
  console.log(PackageConfig.name + ' started on port ' + String(port).red.bold + '...')
})