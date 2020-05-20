import http from '~/libs/Axios/Axios.request'

export const page = (p) => {
  return http.request({
    url: '/api/articleType/page',
    method: 'get',
    data: p
  })
}

export const list = (p) => {
  return http.request({
    url: '/api/articleType',
    method: 'get',
    data: p
  })
}

export const details = (p) => {
  return http.request({
    url: `/api/articleType/${p}`,
    method: 'get'
  })
}

export const remove = (p) => {
  return http.request({
    url: `/api/articleType`,
    method: 'delete',
    data: p
  })
}

export const update = (p) => {
  return http.request({
    url: `/api/articleType`,
    method: 'put',
    data: p
  })
}

export const add = (p) => {
  return http.request({
    url: `/api/articleType`,
    method: 'post',
    data: p
  })
}
