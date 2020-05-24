export const state = () => ({
  hasLogin: false
})
export const getters = {}
export const mutations = {
  SET_HAS_LOGIN(state, n) {
    state.hasLogin = n
  }
}
export const actions = {
  login({ commit, rootState }, { email, password }) {
  },
  getUserInfo({ rootState }) {
    console.log(rootState)
  }
}
