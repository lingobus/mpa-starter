var router = require('express').Router()

function applyRouter(app) {
  const pages = [
    {
      path: '/',
      template: 'index',
    },
    {
      path: '/bem',
      template: 'bem',
    },
    {
      path: '/mobile-layout1',
      template: 'mobile-layout1',
    },
    {
      path: '/mobile-layout2',
      template: 'mobile-layout2',
    },
    {
      path: '/mobile-layout3',
      template: 'mobile-layout3',
    },
    {
      path: '/mobile-layout4',
      template: 'mobile-layout4',
    },
    {
      path: '/lazyload',
      template: 'lazyload',
    },
    {
      path: '/add-edit-examine',
      template: 'add-edit-examine',
    },
    {
      path: '/login',
      template: 'login',
    },
    {
      path: '/register',
      template: 'register',
    },
  ]

  pages.forEach(p => {
    router.get(p.path, function (req, res) {
      res.render(p.template)
    })
  })

  app.use(require('./i18n'))
  app.use(router)
}

module.exports = applyRouter
