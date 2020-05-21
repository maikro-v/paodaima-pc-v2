import request from '@/api/request'

export default (ctx, inject) => {
  const createRequest = request(ctx.$axios)
  inject('api', createRequest)
}
