import { getCookie } from '@/libs/utils.js'
export default ({ app }) => {
  app.router.beforeEach((to, from , next) => {
	 let {store} = app
	 let  isAdmin=null
	
	 if( JSON.stringify( getCookie() ) == "{}" ){
		 store.dispatch('user/visitorLogin')
	 }
	 if(process.browser) {
		  if(localStorage.getItem('isAdmin')&&!store.state.user.userInfo){
				 store.dispatch('user/getUserinfo')
		  }
	 }
	 // //已登录而且没有用户信息
	
    next();
  })
}
