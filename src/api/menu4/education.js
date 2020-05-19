import http from '../../utils/http'

export function findEducationByUsername (data) {
  return http({
    url: '/audit/educationInfo',
    method: 'get',
    params: data
  })
}

export function updateEducationInfo (data) {
  return http({
    url: '/audit/educationInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/educationInfoList',
    method: 'get',
    params: data
  })
}

export function updateEducationAuditRes (data) {
  return http({
    url: '/audit/educationAuditRes',
    method: 'post',
    data: data
  })
}
