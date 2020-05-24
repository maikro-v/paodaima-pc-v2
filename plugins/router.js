export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const verifyPages = ['my', 'article-type']
    const hsgLogin = app.store.state.user.hasLogin
    if (!hsgLogin && verifyPages.includes(to.name)) {
      // 跳转的页面需要登录，但用户没有登录
      app.store.commit('SET_CAN_SHOW_LOGIN', true)
      return
    }
    next()
  })
}
