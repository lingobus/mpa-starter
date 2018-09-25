import Vue from 'vue'
import parseQuery, { encodeQuery } from 'utils/_parse-query.js'
import { i18nInit } from 'compound-utils/i18n'
import ElLoading from 'element-ui/lib/loading'
import Icon from 'vue-awesome'

export function pageInit (params = {}) {
  const {
    customI18N, // 可选。页面额外需要引入的国际化翻译
    vue, // 必需。创建vue实例需要的参数
  } = params

  $LB.query = parseQuery(location.search)

  ElLoading.install(Vue)
  Vue.component('fa-icon', Icon)

  i18nInit({vue, customI18N})

  if (!vue.el) {
    vue.el = "#root"
  }
  new Vue(vue)
}