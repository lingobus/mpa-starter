const router = require('express').Router()
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

pages.forEach(p => {
  router.get(p.path, function (req, res) {
    res.render(p.template, Object.assign({}, DEFAULT_SEO, p.locals))
  })
})

module.exports = router
