class Browser {
  /*
  * 获取版本
  * */
  version() {
    const u = navigator.userAgent
    return {
      trident: u.includes('Trident'), // IE内核
      presto: u.includes('Presto'), // opera内核
      webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
      gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.includes('Android') || u.includes('Adr'), // android终端
      iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
      iPad: u.includes('iPad'), // 是否iPad
      webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
      weixin: u.includes('MicroMessenger'), // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  }
}

export default Browser
