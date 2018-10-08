const router = require('express').Router()
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

pages.forEach(p => {
  router.get(p.path, function (req, res) {
    res.render(p.template, Object.assign({}, DEFAULT_SEO, p.locals))
  })
})

module.exports = router
