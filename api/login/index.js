import { request } from '../../utils'

export function toLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
