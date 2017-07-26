import { request, config } from '../utils'
const { api } = config
const { riverQuery } = api

export async function query (params) {
  return request({
    url: riverQuery,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: riverQuery,
    method: 'delete',
    data: params,
  })
}
