import { ref } from "vue";
import { createI18n } from "vue-i18n"; 
import zh from './lang/zh'; 
import en from './lang/en'; 

// 初始化国际化
let  currentLanguage
// 如果本地记录了语言环境，则使用缓存
const isLocal = localStorage.getItem('locale') || ''
if(isLocal) {
  currentLanguage = JSON.parse(isLocal)?.curLocale
} else {
  // 获取当前浏览器使用的语言
  currentLanguage = navigator.language.replace(/-(\S*)/, '')
}
const i18n = createI18n({ 
  legacy: false, // 修复组件引入i18n时vite脚手架报错的问题
  locale: currentLanguage,
  globalInjection: true, // 全局注册 $t
  messages: {
    zh,
    en
  }
});

export default i18n; 

// 语言列表
export const langs =  [
  {
    key: 'zh', 
    title: '中文',
  },
  {
    key: 'en', 
    title: 'English'
  }
]

// 修改当前语言
export let locale = ref(i18n.global.locale.value)
export function setLocale(lang:string) {
  locale.value = lang
  i18n.global.locale.value = lang
  return {
    locale
  }
}


