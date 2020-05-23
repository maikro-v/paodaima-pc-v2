/**
 * 节流函数
 * @param { Function } callback 回调方法
 * @param { Number } time 间隔时间 单位:s；多少秒之后执行回调方法
 * @return void
 */
export function throttle(callback, time) {
  let vaild = false
  return function() {
    if (vaild) {
      return
    }
    vaild = true
    callback && callback()
    setTimeout(() => {
      vaild = false
    }, time)
  }
}
