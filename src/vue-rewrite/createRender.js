// 自定义渲染器原理：
// 把所有的增删改查操作都暴露出去，使用的时候，我们不需要知道内部的实现细节，只需要针对不同的平台调用不同的API即可



import {createRenderer} from '@vue/runtime-core'

const {createApp: originCa} = createRenderer({
  insert: (child, parent, anchor) => {
    if(typeof child === 'string') {
      parent.text = child
    } else {
      child.parent = parent
      if(!parent.child) {
        parent.child = [child]
      } else {
        parent.child.push(child)
      }
    }
    if(parent.nodeName) {
      draw(child)
      if(child.onClick) {
        ctx.canvas.addEventListener('click', () => {
          child.onClick()
          setTimeout(() => {
            draw(child)
          })
        }, false)
      }
    }
  },
  createElement: (type, isSVG, isCustom) => {
    return {
      type
    }
  },
  setElementText: (node, text) => {
    node.text = text
  },
  patchProp: (el, key,prev, next) => {
    el[key] = next
  }
})

let ctx
// 使用canvas操作方法，递归的将canvas对象渲染到canvas标签内部
function draw(ele,isChild) {
  if(!isChild) {
    ctx.clearRect(0, 0, 500, 500)
  }
  ctx.fillStyle = ele.fill || 'white'
  ctx.fillRect(...ele.pos)
  if(ele.text) {
    ctx.fillStyle = ele.color || 'white'
    ctx.fontSize = ele.type === 'h1' ? 20 : 12
    ctx.font = (ctx.fontSize || 18) + 'px serif'
    ctx.fillText(ele.text, ele.pos[0] + 10, ele.pop[1] + ele.fontSize)
  }
  ele.child && ele.child.forEach(child => {
    console.log('child: ',child);
    draw(child, true)
  })
}


function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {
      const canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      document.querySelector(selector).appendChild(canvas)
      ctx = canvas.getContext('2d')
      app.mount(canvas)
    }
  }
}

