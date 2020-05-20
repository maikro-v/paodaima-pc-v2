import request from './request'

export const list = (data) => {
  return request({
    url: '/api/classify',
    method: 'get',
    data
  })
}


export const tagList = (data) => {
  return request({
    url: '/api/tag',
    method: 'get',
    data
  })
}
