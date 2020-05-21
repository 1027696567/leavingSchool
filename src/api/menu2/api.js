import http from '../../utils/http'

export function addInformation (data) {
  return http({
    url: '/sys/information',
    method: 'post',
    data: data
  })
}

export function findAllInformation () {
  return http({
    url: '/sys/informations',
    method: 'get'
  })
}

export function findPartInformation (data) {
  return http({
    url: '/sys/partInformation',
    method: 'get',
    params: data
  })
}

export function findInformation (data) {
  return http({
    url: '/sys/information',
    method: 'get',
    params: data
  })
}

export function auditInformation (data) {
  return http({
    url: '/sys/auditRes',
    method: 'post',
    data: data
  })
}

export function updateInformation (data) {
  return http({
    url: '/sys/information',
    method: 'put',
    data: data
  })
}

export function updateInformationStatus (data) {
  return http({
    url: '/sys/informationStatus',
    method: 'put',
    data: data
  })
}

export function findAuditResByInformationId (data) {
  return http({
    url: '/sys/auditRes',
    method: 'get',
    params: data
  })
}

export function buttomAudit () {
  return http({
    url: '/sys/buttomAudit',
    method: 'get'
  })
}
