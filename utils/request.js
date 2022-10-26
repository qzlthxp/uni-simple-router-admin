import Vue from 'vue'
import { baseUrl } from '../config.js'
import store from '../store'

let requestCount = 0

export const request = ({ url, method = 'get', data, loading = true, needToken = true }) => {
  return new Promise((resolve, reject) => {
    if (loading) {
      requestCount++
      if (requestCount <= 1) {
        uni.showLoading({
          title: '加载中'
        })
      }
    }

    const header = {}
    if (needToken) {
      header['TOKEN'] = getStorageSync(Vue.prototype.$userToken)
    }

    uni.request({
      header,
      url: baseUrl + url,
      method,
      data,
      success(res) {
        const { statusCode, data } = res
        if (statusCode === 200) {
          resolve(data)
        } else if (statusCode === 401) {
          uni.showToast({
            title: '认证失败，请重新登录',
            icon: 'none',
            duration: 2000,
            position: 'bottom'
          })
          requestCount = 0
          store.dispatch('user/logout')
          uni.reLaunch({
            url: '/pages/login/index'
          })
          reject(data)
        } else {
          reject(data)
        }
      },
      fail(err) {
        uni.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2000
        })
        reject(err)
      },
      complete() {
        if (loading && requestCount) {
          requestCount--
        }
        if (requestCount === 0) {
          uni.hideLoading()
        }
      }
    })
  })
}
