export const state = () => ({
  tagList: []
})
export const getters = {}
export const mutations = {
  SET_TAG_LIST(state, n) {
    state.tagList = n
  }
}
export const actions = {
  getTagList({ commit }) {
    return new Promise((resolve, reject) => {
      this.$api.tag.list().then(({ data }) => {
        commit('SET_TAG_LIST', data)
        resolve(data)
      })
    })
  }
}
