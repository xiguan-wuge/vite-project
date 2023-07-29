export function reactive(target, mutableHandlers) {
  if(typeof target !== 'object') {
    console.warn(`reactive ${target} must be object`)
    return
  }
  return new Proxy(target, mutableHandlers)
}