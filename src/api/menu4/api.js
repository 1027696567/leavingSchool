import http from '../../utils/http'

export function findStuCardByUsername (data) {
  return http({
    url: '/audit/stuCardInfo',
    method: 'get',
    params: data
  })
}

export function updateStuCardInfo (data) {
  return http({
    url: '/audit/stuCardInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/stuCardInfoList',
    method: 'get',
    params: data
  })
}

export function updateDeptAuditRes (data) {
  return http({
    url: '/audit/deptAuditRes',
    method: 'post',
    data: data
  })
}
