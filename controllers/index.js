const router = require('express').Router()
const DEFAULT_SEO = require('../common/settings.js').DEFAULT_SEO

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
      path: '/login',
      template: 'login',
    },
    {
      path: '/register',
      template: 'register',
    },
    {
      path: '/reset-password',
      template: 'reset-password',
    },
    {
      path: '/dynamic-import',
      template: 'dynamic-import',
    },
    {
      path: '/storage-management',
      template: 'storage-management',
    },
    {
      path: '/components-demo',
      template: 'components-demo',
    },
    {
      path: '/dynamic-form-validation',
      template: 'dynamic-form-validation',
    },
  ]

  pages.forEach(p => {
    router.get(p.path, function (req, res) {
      res.render(p.template, Object.assign({}, DEFAULT_SEO, p.locals))
    })
  })

  app.use(require('./i18n'))
  app.use(require('./add-edit-search'))
  app.use(require('./permissions'))
  app.use(router)
}

module.exports = applyRouter
