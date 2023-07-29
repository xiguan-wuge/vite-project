import { track, trigger } from "../../../../weiyouyi/src/reactivity/effect"
import { isObject } from "../../../../weiyouyi/src/shared"
import { reactive } from "./reactive"

const get = createGetter()
const set = createSetter()

function createGetter(shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, recevier)
    track(target, 'get', key)
    if(isObject(res)) {
      return shallow ? res : reactive(res)
    }
  }
}

function createSetter() {
  return function set(target, key, value, recevier) {
    const result = Reflect.set(target, key, value, recevier) 
    trigger(target, 'set', key)
    return result
  }
}

// 配置proxy的拦截函数
export const mutableHandlers = {
  get,
  set
}