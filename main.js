import App from './App'
import Vue from 'vue'
import store from './store'
import { router, RouterMount } from './router'
Vue.use(router)

import { isOnline } from './utils'

import { storageConfig } from './config'
for (const [key, val] of Object.entries(storageConfig)) {
  Vue.prototype[`$${key}`] = val
}

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$isOnline = isOnline
Vue.prototype.$platform = process.env.VUE_APP_PLATFORM

App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
