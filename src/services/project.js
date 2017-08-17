import { request, config } from '../utils'
const { api } = config
const { projectQuery } = api

export async function query (params) {
  return request({
    url: projectQuery,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: projectQuery,
    method: 'delete',
    data: params,
  })
}


