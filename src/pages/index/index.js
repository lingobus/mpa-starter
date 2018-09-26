/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import routes from './routes.js'
import modules from './store.js'
import 'utils/_interceptors.js'
window.$LB = window.$LB || {}

// sensorsdata
// import SA from 'utils/_sa-helper.js'
// import { PROJECT } from '../../common/settings.js'
// Vue.use(SA, PROJECT)

// Vuex is already installed when import with script tag
// Vue.use(Vuex)

/* eslint-disable no-new */
const router = new VueRouter({
  routes,
  mode: 'history',
})

// vuex
const store = new Vuex.Store({
  modules
})


const app = new Vue({
  store,
  router,
  el: '#root',
  render: h => h(App)
})
