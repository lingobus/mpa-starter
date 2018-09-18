import Vue from 'vue'
import VueI18n from 'vue-i18n'
import parseQuery, { encodeQuery } from 'utils/_parse-query.js'

export function pageInit (params = {}) {
  const {
    customI18N, // 可选。页面额外需要引入的国际化翻译
    vue, // 必需。创建vue实例需要的参数
  } = params

  $LB.query = parseQuery(location.search)

  Vue.use(VueI18n)

  const i18n = new VueI18n({
    locale: $LB.locale,
    fallbackLocale: 'en-US',
    messages: customI18N || {},
    silentTranslationWarn: process.env.NODE_ENV === 'development'
  })

  if (!vue.el) {
    vue.el = "#root"
  }
  vue.i18n = i18n
  new Vue(vue)
}