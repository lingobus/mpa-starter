const url = require('url')
const router = require('express').Router()

const defaultLang = 'en-us'

// 不同语言渲染同一个jade模板
const singleTemplatePages = [
  'internationalization'
]

singleTemplatePages.forEach(page => {
  function renderPage (res, page, locale) {
    res.locals.locale = formatLocale(locale)
    res.render(page)
  }

  // 路径中有locale以路径为准
  router.get("/:locale/" + page, function(req, res, next){
    renderPage(res, page, req.params.locale)
  })

  // 路径中没有locale以cookie为准
  router.get('/' + page, function (req, res, next) {
    renderPage(res, page, req.cookies.locale || defaultLang)
  })
})

// 不同语言渲染不同jade模板
const multiTemplatePages = [
  'internationalization-multi'
]

multiTemplatePages.forEach(page => {
  function renderPage (res, page, locale) {
    res.locals.locale = formatLocale(locale)
    res.render(page + '-' + locale)
  }

  // 路径中有locale以路径为准
  router.get("/:locale/" + page, function(req, res, next){
    renderPage(res, page, req.params.locale)
  })

  // 路径中没有locale以cookie为准
  router.get('/' + page, function (req, res, next) {
    renderPage(res, page, req.cookies.locale || defaultLang)
  })
})

/**
 * 将 en-us 转换为 en-US
 */
function formatLocale(str) {
  var res = ''
  try {
    const tempArr = str.split('-')
    res = tempArr[0] + '-' + tempArr[1].toUpperCase()
  } catch(err) {
    res = 'en-US'
    console.log('format locale string fail!!'.red.bold)
  }
  return res
}

module.exports = router
