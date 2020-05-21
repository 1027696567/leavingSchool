import http from '../../utils/http'

export function findAllFinalAudit () {
  return http({
    url: '/audit/listFinalAuditRes',
    method: 'get'
  })
}

export function findByUsername (data) {
  return http({
    url: '/audit/finalAuditRes',
    method: 'get',
    params: data
  })
}

export function updateFinalAuditRes (data) {
  return http({
    url: '/audit/finalAuditRes',
    method: 'post',
    data: data
  })
}
