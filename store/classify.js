export const state = () => ({
  classifyList: []
})
export const getters = {}
export const mutations = {
  SET_CLASSIFY_LIST(state, n) {
    state.classifyList = n
  }
}
export const actions = {
  getClassifyList({ commit }) {
    return new Promise((resolve, reject) => {
      this.$api.classify.list().then(({ data }) => {
        commit('SET_CLASSIFY_LIST', data)
        resolve(data)
      })
    })
  },
  getClassifyAll({ commit }) {
    return new Promise((resolve, reject) => {
      this.$api.classify.all().then(({ data }) => {
        commit('SET_CLASSIFY_LIST', data)
        resolve(data)
      })
    })
  }
}
