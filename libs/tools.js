/**
 * 节流函数
 * @param { Function } callback 回调方法
 * @param { Number } time 间隔时间 单位:s；多少秒之后执行回调方法
 * @return void
 */
export function throttle(callback, time) {
  let vaild = false
  return function(arg) {
    if (vaild) {
      return
    }
    vaild = true
    setTimeout(() => {
      vaild = false
      callback && callback(arg)
    }, time)
  }
}

/**
 * 判断是否为空
 * @param val
 * @returns { boolean }
 */
export function isEmpty(val) {
  // null or undefined
  if (val == null) { return true }

  if (typeof val === 'boolean') { return false }

  if (typeof val === 'number') { return !val }

  if (val instanceof Error) { return val.message === '' }

  switch (Object.prototype.toString.call(val)) {
  // String or Array
  case '[object String]':
  case '[object Array]':
    return !val.length

    // Map or Set or File
  case '[object File]':
  case '[object Map]':
  case '[object Set]': {
    return !val.size
  }
  // Plain Object
  case '[object Object]': {
    return !Object.keys(val).length
  }
  }
  return false
}
