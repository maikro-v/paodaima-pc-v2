import http from '~/libs/Axios/Axios.request';
let prefix = "http://127.0.0.1:3000/api/article";

export const page = (p) => {
  return http.request({
    url: '/api/article/page',
    method: 'get',
    data: p
  })
}

export const recommend = (p) => {
  return http.request({
    url: '/api/article/recommend',
    method: 'get',
    data: p
  })
}

export const pageAdmin = (p) => {
  return http.request({
    url: '/api/article/pageAdmin',
    method: 'get',
    data: p
  })
}

export const remove = (p) => {
  return http.request({
    url: `/api/article`,
    method: 'delete',
    data: p
  })
}

export const update = (p) => {
  return http.request({
    url: `/api/article`,
    method: 'put',
    data: p
  })
}

export const add = (p) => {
  return http.request({
    url: `/api/article`,
    method: 'post',
    data: p
  })
}

export const details = (p) => {
  return http.request({
    url: `/api/article/${p}`,
    method: 'get'
  })
}
