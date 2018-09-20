var router = require('express').Router()

function applyRouter(app) {
  router.get('/', function (req, res) {
    res.render('index/index')
  })

  router.get('/bem', function (req, res) {
    res.render('bem')
  })

  router.get('/mobile-layout', function (req, res) {
    res.render('mobile-layout')
  })

  router.get('/lazyload', function (req, res) {
    res.render('lazyload')
  })

  router.get('/login', function (req, res) {
    res.render('login')
  })

  router.get('/register', function (req, res) {
    res.render('register')
  })

  app.use(require('./i18n'))
  app.use(router)
}

module.exports = applyRouter
