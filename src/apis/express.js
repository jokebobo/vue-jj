import {request3000} from '~@/utils/request'

request3000.defaults.baseURL="http://localhost:3000"
export function users(data) {
  return request3000({
    method: 'post',
    data: data,
    url: '/users'
  })
}
export function chatlist(data) {
  return request3000({
    method: 'post',
    data: data,
    url: '/chatlist'
  })
}