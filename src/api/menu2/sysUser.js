import http from '../../utils/http'

export function findAllUser () {
  return http({
    url: '/user/sysUser',
    method: 'get'
  })
}
