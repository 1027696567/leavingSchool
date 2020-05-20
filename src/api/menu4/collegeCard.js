import http from '../../utils/http'

export function findCollegeCardByUsername (data) {
  return http({
    url: '/audit/collegeCardInfo',
    method: 'get',
    params: data
  })
}

export function updateCollegeCardInfo (data) {
  return http({
    url: '/audit/collegeCardInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/collegeCardInfoList',
    method: 'get',
    params: data
  })
}

export function updateCollegeCardAuditRes (data) {
  return http({
    url: '/audit/collegeCardAuditRes',
    method: 'post',
    data: data
  })
}
