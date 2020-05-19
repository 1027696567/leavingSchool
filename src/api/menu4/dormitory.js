import http from '../../utils/http'

export function findDormitoryByUsername (data) {
  return http({
    url: '/audit/dormitoryInfo',
    method: 'get',
    params: data
  })
}

export function updateDormitoryInfo (data) {
  return http({
    url: '/audit/dormitoryInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/dormitoryInfoList',
    method: 'get',
    params: data
  })
}

export function updateDormitoryAuditRes (data) {
  return http({
    url: '/audit/dormitoryAuditRes',
    method: 'post',
    data: data
  })
}
