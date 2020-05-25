export const state = () => ({
  token: '',
  canShowLogin: false // 是否显示登录框
})
export const getters = {}
export const mutations = {
  SET_TOKEN(state, n) {
    state.token = n
  },
  SET_CAN_SHOW_LOGIN(state, n) {
    state.canShowLogin = n
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // 从请求头中获取token，记录当前用户
    const token = req.headers.cookie
    if (token) {
      commit('SET_TOKEN', token)
    }
  }
}
