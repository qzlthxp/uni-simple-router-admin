import { request } from '../../utils'

export function getUserInfo(data) {
  return request({
    url: '/userInfo',
    method: 'get',
    data
  })
}

export function getRoutes(data) {
  return request({
    url: '/userRoutes',
    method: 'get',
    data
  })
}
