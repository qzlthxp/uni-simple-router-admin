import Vue from 'vue'
import { toLogin, getUserInfo } from '../../api'

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    getInfo(context) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            context.commit('setUserInfo', res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    login(context, data) {
      return new Promise(async (resolve, reject) => {
        // 在线
        toLogin(data)
          .then((res) => {
            const { token } = res
            uni.setStorageSync(Vue.prototype.$userToken, token)
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('removeUserInfo')
        uni.removeStorageSync(Vue.prototype.$userToken)
        resolve()
      })
    }
  }
}
