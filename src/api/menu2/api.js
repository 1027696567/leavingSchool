import http from '../../utils/http'

export function findAllNews (data) {
  return http({
    url: '/contract/addContractInfo',
    method: 'get',
    data: data
  })
}
