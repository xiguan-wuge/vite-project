import { hydrate } from "vue"

export function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  const {
    insert,
    remove,
    setText
  } = options

  const render = (vnode, container, isSVG) => {
    if(vnode ===  null) {
      if(container._vnode) {
        unmount(container, vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null,null, isSVg)
    }
    flushPostFlushCbs()
    container._vnode = vnode
  }

  return {
    render,
    createApp: createAppAPI(render, hydrate)
  }
}