/* 封装模拟后台返回状态码 */
export default function(data) {
  const state = {
    'code': 1,
    'msg': '获取成功'
  }
  return Object.assign(state, { result: data })
}
