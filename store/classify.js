import * as classify from '@/api/classify'

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
  getClassifyList() {
    classify.list().then(res => {
      console.log(res)
    })
  }
}