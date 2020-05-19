import http from '../../utils/http'

export function findMinistryFinanceByUsername (data) {
  return http({
    url: '/audit/ministryFinanceInfo',
    method: 'get',
    params: data
  })
}

export function updateMinistryFinanceInfo (data) {
  return http({
    url: '/audit/ministryFinanceInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/ministryFinanceInfoList',
    method: 'get',
    params: data
  })
}

export function updateMinistryFinanceAuditRes (data) {
  return http({
    url: '/audit/ministryFinanceAuditRes',
    method: 'post',
    data: data
  })
}
