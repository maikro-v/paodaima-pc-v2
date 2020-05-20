import http from '~/libs/Axios/Axios.request'

export const page = (p) => {
  return http.request({
    url: '/api/message/page',
    method: 'get',
    data: p
  })
}

export const pageAdmin = (p) => {
  return http.request({
    url: '/api/message/pageAdmin',
    method: 'get',
    data: p
  })
}

export const remove = (p) => {
  return http.request({
    url: `/api/message`,
    method: 'delete',
    data: p
  })
}

export const update = (p) => {
  return http.request({
    url: `/api/message`,
    method: 'put',
    data: p
  })
}

export const add = (p) => {
  return http.request({
    url: `/api/message`,
    method: 'post',
    data: p
  })
}

export const details = (p) => {
  return http.request({
    url: `/api/message/${p}`,
    method: 'get'
  })
}
