import {ref, inject, computed} from 'vue'

const ROUTER_KEY = '__router__'

function createRouter(options) {
  return new Router(options)
}

function useRouter() {
  return inject(ROUTER_KEY)
}

function createWebHashHistory(){
  function bindEvents(fn) {
    window.addEventListener('hashchange', fn)
  }
  return {
    bindEvents,
    url: window.location.hash.slice(1) || '/'
  }
}


class Router {
  constructor(options) {
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)

    this.history.bindEvents(()=>{
      this.current.value = window.location.hash.slice(1)
    })
  }

  install(app) {
    app.provide(ROUTER_KEY, this)
    // 同时注册 router-view router-link组件
    // app.component('router-view', RouterView)
    // app.component('router-link', RouterLink)
  }
}

export {
  createRouter,
  useRouter,
  createWebHashHistory
}

// 上述代码中，通过监听hash事件，获取当前URL中的hash，并赋值给this.current.value
// 接下来就是需要监听this.current.value变化，在视图中渲染对应的组件 借助动态路由
// 即：实现RouterView组件

// routerView组件
// <template>
//   <component :is="comp"></component>
// </template>

const router = useRouter()
const comp = computed(()=> {
  const route = router.routes.find(item => {
    return item.path === router.current.value
  })
  return route ? route.component : null
})

// RouterLink组件
// 功能:实现hash的修改
// 实现：借助a标签，href属性修改当前url的hash

// <template>
//   <a :href="'#'+props.to">
//     <slot />
//   </a>
// </template>

// <script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})



