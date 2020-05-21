import request from './request'
const createRequest = new Request()

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
