// import { getToken } from '@/libs/utils'
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // const token = getToken()
    // // 需要验证的路由页面name
    // // const verifyPages = ['article-edit']
    // // const hsgLogin = app.store.state.user.hasLogin
    // console.log(token, app.header.cookie)
    // // if (!hsgLogin && verifyPages.includes(to.name)) {
    // //   // 跳转的页面需要登录，但用户没有登录
    // //   next({
    // //     name: 'login'
    // //   })
    // //   return
    // // }
    next()
  })
}
