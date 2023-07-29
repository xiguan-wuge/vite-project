const targetMap = new WeakMap()
let activeEffect = null

export function track(target, type, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps) {
    deps = new Set()
  }

  if(!deps.has(activeEffect) && activeEffect) {
    // 防止重复注册
    deps.add(activeEffect)
  }

  depsMap.set(key, deps)
}

export function trigger(target, key, type) {
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const deps = depsMap.get(key)
  if(!deps) return

  deps.forEach(effectFn => {
    if(effectFn.sheduler) {
      effectFn.sheduler()
    } else {
      effectFn()
    }
  })
}

export function effect(fn, options = {}) {
  // effect 嵌套，采用队列来管理
  const effectFn = () => {
    try {
      activeEffect = effectFn
      // fn执行 =》内部读取响应式数据 =》 get函数中读取到activeFn 
      return fn()
    } finally {
      activeEffect = null
    }
  }

  if(!options.lazy) {
    effectFn()
  }

  // 调度时机，watchEffect中会用到
  effectFn.sheduler = options.sheduler

  return effectFn
}