import Vue from 'vue'
import { getRoutes } from '../../api'

export default {
  namespaced: true,
  state: {
    dynamicRoutes: []
  },
  mutations: {
    setDynamicRoutes(state, payload) {
      state.dynamicRoutes = payload
    }
  },
  actions: {
    getRoutes(context) {
      return new Promise((resolve, reject) => {
        getRouters()
          .then((res) => {
            res = [
              { path: '/pages/notFound/index' },
              { path: '/pages/login/index' },
              { path: '/pages/profile/index' },
              { path: '/pages/index/index' }
            ]
            context.commit('setDynamicRoutes', res)
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
