
const DEFAULT_SEO = require('../common/settings.js').DEFAULT_SEO
const pages = [
  {
    path: '/add-edit-search',
    template: 'add-edit-search',
  },
  {
    path: '/add-edit-search/add',
    template: 'add-edit-search',
  },
  {
    path: '/add-edit-search/edit/:id',
    template: 'add-edit-search',
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
