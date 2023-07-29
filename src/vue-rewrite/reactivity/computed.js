import { effect, trigger } from "./effect"

export function computed(getterOrOptions) {
  let getter, setter
  if(typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    setter = () => {
      console.warn('计算属性不能修改')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
  constructor(getter, setter) {
    this._setter = setter
    this._val = undefined
    this._dirty = true
    // computed： 特殊的effect，设置了lazy 与执行时间
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if(!this._dirty) {
          this._dirty = true
          trigger(this, 'value')
        }
      }
    })
  }

  get value() {
    track(this, value)
    if(this._dirty) {
      this._dirty = false
      this._val = this.effect() // 重新取值
    }
    return this._val
  }

  set value(val) {
    this._setter(val)
  }
}