export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // 需要验证的路由页面name
    const verifyPages = []
    const hsgLogin = app.store.state.user.hasLogin
    if (!hsgLogin && verifyPages.includes(to.name)) {
      // 跳转的页面需要登录，但用户没有登录
      app.store.commit('SET_CAN_SHOW_LOGIN', true)
      return
    }
    next()
  })
}
