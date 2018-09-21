import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cookies from 'cookies-js'

export function i18nInit (params = {}) {
  const {
    customI18N, // 可选。页面额外需要引入的国际化翻译
    vue, // 必需。创建vue实例需要的参数
  } = params

  Vue.use(VueI18n)
  const i18n = new VueI18n({
    locale: $LB.locale,
    fallbackLocale: 'en-US',
    messages: customI18N || {},
    silentTranslationWarn: process.env.NODE_ENV === 'development'
  })

  var html = document.querySelector("html");
  html.classList.add($LB.locale);

  vue.i18n = i18n
}

export function changeLocale (locale) {
  const prevLocale = $LB.locale
  if (locale === prevLocale) return

  const defaultLocale = 'en-US'
  const l = window.location
  var url, pathname
  cookies.set('locale', locale)

  if (locale === defaultLocale) {
    // 默认locale没有前缀
    pathname = l.pathname.replace(`/${prevLocale.toLowerCase()}`, '')
    url = `//${l.host}${pathname}${l.search}${l.hash}`
  } else {
    // 其他的locale需要增加前缀，比如 https://www.lingobus.com/zh-CN/teacher-overview
    pathname = l.pathname.replace(`/${prevLocale.toLowerCase()}`, `/${locale.toLowerCase()}`)
    url = `//${l.host}/${locale.toLowerCase()}${pathname === '/' ? '' : pathname}${l.search}${l.hash}`
  }
  // 更新history并且reload
  location.replace(url)
}