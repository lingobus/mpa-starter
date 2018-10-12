const router = require('express').Router()
const Settings = require('../common/settings.js')
const DEFAULT_SEO = Settings.DEFAULT_SEO
const DEFAULT_LANG = Settings.DEFAULT_LANG

// 不同语言渲染同一个pug模板
const singleTemplatePages = [
  {
    path: '/internationalization',
    template: 'internationalization',
    i18n: {
      "en-US": {
        "title": "A MPA Vue.js Project(Text in template can be crawled by search engines)",
      },
      "zh-CN": {
        "title": "多页面Vue.js工程(模板中的文本可以被搜索引擎抓取)",
      },
    }
  }
]

singleTemplatePages.forEach(page => {
  function renderPage (res, page, locale) {
    const l = formatLocale(locale)
    res.render(page.template, Object.assign({}, DEFAULT_SEO, { l }, page.i18n[l], page.locals))
  }

  // 路径中有locale以路径为准
  router.get("/:locale" + page.path, function(req, res, next){
    renderPage(res, page, req.params.locale)
  })

  // 路径中没有locale以cookie为准
  router.get(page.path, function (req, res, next) {
    renderPage(res, page, req.cookies.locale || DEFAULT_LANG)
  })
})

// 不同语言渲染不同pug模板
const multiTemplatePages = [
  {
    path: '/internationalization-multi',
    template: 'internationalization-multi',
  }
]

multiTemplatePages.forEach(page => {
  function renderPage (res, page, locale) {
    res.render(page.template + '/' + locale, Object.assign({}, DEFAULT_SEO, { locale: formatLocale(locale) }, page.locals))
  }

  // 路径中有locale以路径为准
  router.get("/:locale" + page.path, function(req, res, next){
    renderPage(res, page, req.params.locale)
  })

  // 路径中没有locale以cookie为准
  router.get(page.path, function (req, res, next) {
    renderPage(res, page, req.cookies.locale || DEFAULT_LANG)
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
