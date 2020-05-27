import { setToken } from '@/libs/utils'

export const state = () => ({
  name: '',
  avatar: '',
  email: '',
  articleCount: 0,
  likeCount: 0,
  hasLogin: false
})
export const getters = {}
export const mutations = {
  SET_HAS_LOGIN(state, n) {
    state.hasLogin = n
  },
  SET_NAME(state, n) {
    state.name = n
  },
  SET_AVATAR(state, n) {
    state.avatar = n
  },
  SET_EMAIL(state, n) {
    state.email = n
  },
  SET_ARTICLE_COUNT(state, n) {
    state.articleCount = n
  },
  SET_LINK_COUNT(state, n) {
    state.linkCount = n
  }
}
export const actions = {
  // 访客登录
  visitorLogin({ commit }) {
    return new Promise((resolve, reject) => {
      console.log('游客登录')
      this.$api.user.visitorLogin().then(({ data }) => {
        setToken(data)
        // 访客不设置已登录状态
        commit('SET_HAS_LOGIN', false)
        resolve(data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      this.$api.user.login({
        email,
        password
      }).then(({ data }) => {
        setToken(data)
        commit('SET_HAS_LOGIN', true)
        resolve(data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  logout({ commit }) {
    this.$api.user.userInfo().then(({ data }) => {
      setToken('')
      commit('SET_HAS_LOGIN', false)
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      this.$api.user.userInfo().then(({ data }) => {
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_EMAIL', data.email)
        commit('SET_ARTICLE_COUNT', data.articleCount)
        commit('SET_LINK_COUNT', data.linkCount)
        commit('SET_HAS_LOGIN', true)
        resolve(data)
      }).catch(reject)
    })
  }
}
