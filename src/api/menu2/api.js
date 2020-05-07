import http from '../../utils/http'

export function addInformation (data) {
  return http({
    url: '/sys/information',
    method: 'post',
    data: data
  })
}

export function findAllInformation () {
  return http({
    url: '/sys/information',
    method: 'get'
  })
}
