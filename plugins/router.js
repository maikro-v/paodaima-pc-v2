export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const verifyPages = ['my', 'article-type']
    const hasToken = app.store.state.token
    if (!hasToken && verifyPages.includes(to.name)) {
      // 跳转的页面需要登录，但用户没有登录
      app.store.commit('SET_CAN_SHOW_LOGIN', true)
      return
    }

    // 已经登录，获取用户信息
    if (hasToken) {
      app.$api.user.userInfo().then((res) => {
        console.log(res)
      })
    }

    next()
  })
}
