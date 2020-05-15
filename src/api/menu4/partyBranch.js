import http from '../../utils/http'

export function findPartyBranchByUsername (data) {
  return http({
    url: '/audit/partyBranchInfo',
    method: 'get',
    params: data
  })
}

export function updatePartyBranchInfo (data) {
  return http({
    url: '/audit/partyBranchInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/partyBranchInfoList',
    method: 'get',
    params: data
  })
}

export function updatePartyBranchAuditRes (data) {
  return http({
    url: '/audit/partyBranchAuditRes',
    method: 'post',
    data: data
  })
}
