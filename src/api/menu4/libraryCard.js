import http from '../../utils/http'

export function findLibraryCardByUsername (data) {
  return http({
    url: '/audit/libraryCardInfo',
    method: 'get',
    params: data
  })
}

export function updateLibraryCardInfo (data) {
  return http({
    url: '/audit/libraryCardInfo',
    method: 'put',
    data: data
  })
}

export function findByCondition (data) {
  return http({
    url: '/audit/libraryCardInfoList',
    method: 'get',
    params: data
  })
}

export function updateLibraryCardAuditRes (data) {
  return http({
    url: '/audit/libraryCardAuditRes',
    method: 'post',
    data: data
  })
}
