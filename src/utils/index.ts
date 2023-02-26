
/**
 * 节流函数
 * @param fn 
 * @param time 
 */
function throttle(fn:Function, time:number) {
  let timer:any = null, context:any = this
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      fn.apply(context, [...arguments])
      clearTimeout(timer)
      timer = null
    }, time)
  }
}

export {
  throttle
}