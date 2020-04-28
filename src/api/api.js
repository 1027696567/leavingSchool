import http from '../utils/http'
const api = {
  login (username, password) {
    let url = '/user/login/?userName=' + username + '&passWord=' + password
    return http.get(url)
  },
  getMenu () {
    let url = '/user/menu/'
    return http.get(url)
  }
}
export function register (data) {
  return http({
    url: '/register',
    method: 'post',
    data: data
  })
}
export default api
