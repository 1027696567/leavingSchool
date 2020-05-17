import http from '../../utils/http'

export function findMemberCardByUsername (data) {
  return http({
    url: '/audit/memberCardInfo',
    method: 'get',
    params: data
  })
}

export function updateMemberCardInfo (data) {
  return http({
    url: '/audit/memberCardInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/memberCardInfoList',
    method: 'get',
    params: data
  })
}

export function updateMemberCardAuditRes (data) {
  return http({
    url: '/audit/memberCardAuditRes',
    method: 'post',
    data: data
  })
}
