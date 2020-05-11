import http from '../../utils/http'

export function findStuCardByUsername (data) {
  return http({
    url: '/audit/stuCardInfo',
    method: 'get',
    params: data
  })
}
