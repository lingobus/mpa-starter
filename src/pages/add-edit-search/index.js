/* eslint-disable */
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import { pageInit } from 'utils/_page-common.js'

/* eslint-disable no-new */
const router = new VueRouter({
  routes,
  mode: 'history',
})

pageInit({
  vue: {
    router,
    render: h => h(App)
  }
})