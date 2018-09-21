var router = require('express').Router()

function applyRouter(app) {
  router.get('/', function (req, res) {
    res.render('index/index')
  })

  router.get('/bem', function (req, res) {
    res.render('bem')
  })

  router.get('/mobile-layout1', function (req, res) {
    res.render('mobile-layout1')
  })

  router.get('/mobile-layout2', function (req, res) {
    res.render('mobile-layout2')
  })

  router.get('/mobile-layout3', function (req, res) {
    res.render('mobile-layout3')
  })

  router.get('/mobile-layout4', function (req, res) {
    res.render('mobile-layout4')
  })

  router.get('/lazyload', function (req, res) {
    res.render('lazyload')
  })

  router.get('/add-edit-examine', function (req, res) {
    res.render('add-edit-examine')
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
