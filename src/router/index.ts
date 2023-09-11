import {createRouter, createWebHashHistory} from 'vue-router'
import {pagePermission} from '@/permission/index'

const HelloWorld = () => import('@/components/HelloWorld.vue')
const NoPermission= () => import('@/components/403.vue')
const LazyLoad= () => import('@/components/lazyLoad/lazyLoad.vue')
const BulletLoop= () => import('@/components/bulletLoop/bulletLoop.vue')
const PullLoad= () => import('@/components/pullLoad/pullLoad.vue')
const VirtualList= () => import('@/components/virtualList/virtualList.vue')
const Mock= () => import('@/components/mock/mock.vue')
const I18n = () => import('@/language/demo/demo.vue')
const list = [
  // {
  //   path: '/',
  //   redirect: () => {
  //     return {path:'/helloWorld'}
  //   }
  // },
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/noPermission',
    name: 'NoPermission',
    component: NoPermission
  },
  
  {
    path: '/lazyLoad',
    name: 'LazyLoad',
    component: LazyLoad
  },
  {
    path: '/bulletLoop',
    name: 'BulletLoop',
    component: BulletLoop
  },
  {
    path: '/pullLoad',
    name: 'PullLoad',
    component: PullLoad
  },
  {
    path: '/virtualList',
    name: 'VirtualList',
    component: VirtualList
  },
  {
    path: '/mock',
    name: 'Mock',
    component: Mock
  },
  {
    path: '/waterMark',
    name: 'WaterMark',
    component: () => import('@/components/waterMark/demo.vue')
  },
  {
    path: '/i18n',
    name: 'I18n',
    component: I18n
  },
  {
    path: '/largeFileUpload',
    name: 'LargeFileUpload',
    component: () => import('@/components/largeFileUpload/fileUpload.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: list
})

const defaultPage = [
  'NoPermission',
  'Login'
]
function checkPermisson(name:string) {
  return defaultPage.includes(name) || 
    pagePermission.includes(name) || 
    pagePermission.includes('ALL')
}

// 添加全局守卫
router.beforeEach((to, from) => {
  const {name} = to
  console.log('to', to);
  console.log('beforeEach-to-name', name);
  console.log(pagePermission);
  
  if(!checkPermisson(name)) {
    console.log('noPermission');
    
    // return true
    return {
      name: 'NoPermission',
      replace: true
    }
  } else {
    console.log('ok');
    return true
  }
  
})

 export default router