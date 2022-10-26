import Vue from 'vue'
import { RouterMount, createRouter, runtimeQuit } from 'uni-simple-router'
import store from '../store'

const whiteRoutes = ['/pages/login/index', '/pages/notFound/index']

const router = createRouter({
  platform: Vue.prototype.$platform,
  routerErrorEach: ({ type, level, ...args }) => {
    // #ifdef APP-PLUS
    // 按返回键自动退出应用
    if (type === 3) {
      router.$lockStatus = false
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (level == 1 && args.uniActualData.from === 'backbutton') {
        if (currentPage.$page.meta.isQuit) {
          runtimeQuit()
        }
      }
    }
    // #endif
  },
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: '/pages/notFound/index'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = uni.getStorageSync(Vue.prototype.$userToken)

  if (token) {
    if (to.path === '/pages/login/index') {
      next({
        path: '/pages/index/index',
        NAVTYPE: 'pushTab'
      })
    } else {
      if (!Object.keys(store.getters.userInfo).length) {
        try {
          await store.dispatch('user/getInfo')
          await store.dispatch('route/getRoutes')
          if (store.getters.dynamicRoutes.find((item) => item.path === to.path)) {
            next()
          } else {
            next({
              path: '/pages/notFound/index'
            })
          }
        } catch (error) {
          await store.dispatch('user/logout')
          next({
            path: `/pages/login/index?redirect=${to.path}`,
            NAVTYPE: 'replace'
          })
        }
      } else {
        if (store.getters.dynamicRoutes.find((item) => item.path === to.path)) {
          next()
        } else {
          next({
            path: '/pages/notFound/index'
          })
        }
      }
    }
  } else {
    if (whiteRoutes.includes(to.path)) {
      next()
    } else {
      next({
        path: `/pages/login/index?redirect=${to.path}`
      })
    }
  }
})

// 全局路由后置守卫
router.afterEach((to, from) => {})

export { router, RouterMount }
