import http from '~/libs/Axios/Axios.request';

export const commentPage = (p) => {
  return http.request({
    url: '/api/comment/page',
    method: 'get',
    data: p
  })
}


export const commentCreate = (p) => {
  return http.request({
    url: '/api/comment',
    method: 'post',
    data: p
  })
}

