const DEFAULT_SEO = require('../common/settings.js').DEFAULT_SEO

const pages = [
  {
    path: '/permissions',
    template: 'permissions',
  },
  {
    path: '/permissions/page1',
    template: 'permissions',
  },
  {
    path: '/permissions/page2',
    template: 'permissions',
  },
]

function applyRouter(app) {
  const router = require('express').Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
  })

  pages.forEach(p => {
    router.get(p.path, function (req, res) {
      res.render(p.template, Object.assign({}, DEFAULT_SEO, p.locals))
    })
  })

  app.use(router)
}


module.exports = applyRouter
