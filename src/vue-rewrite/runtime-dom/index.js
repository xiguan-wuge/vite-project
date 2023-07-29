import { createRenderer } from "../runtime-core"

let renderer
function ensureRenderer() {
  // 缓存
  return (
    renderer ||
    (renderer = createRenderer(nodeOps))
  )
}

export const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args)
  const {mount} = app
  
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector)

    if(!container) return

    const component = app._component
    if((!isFunction(component)) && !component.render && !component.template) {
      component.template = container.innerHTML
    }

    container.innerHTML = ''

    const proxy = mount(container, false, container instanceof SVGElement)
    if(container instanceof Element) {
      container.removeAttribute('v-clock')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }
  return app
}

function normalizeContainer(container) {
  if(typeof container === 'string') {
    const res = document.querySelector(container)
    return res
  }
  return container
}

const nodeOps = {
  insert: (child,parent, anchor) => {
    parent.inserBefore(child, anchor || null)
  },
  remove: (child) => {
    const parent = child.parent
    if(parent) {
      parent.removeChild(child)
    }
  },
  createELement: (tag, isSVG, is, props) => {
    const el = isSVG 
      ? doc.createELementNS(svgNS, tag)
      : doc.createElement(tag, is ? {is} : undefined)

    if(tag === 'select' && props && props.multiple !==  null) {
      el.setAttribute('multiple', props.multiple)
    }
    return el
  },
  setText: (node, text) => {
    node.nodeValue = text
  },
  setElementText: (el, text) => {
    el.textContent = text
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector) // doc 从哪里获取的
}