
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
function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function pxToVw(px: number) {
  const vw = getViewportWidth()
  const result = ((px / vw)*100).toFixed(3) + 'vw'
  return result
}

export {
  throttle
}