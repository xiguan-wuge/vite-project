<template>
  <div>
    切换语言：
    <span 
      v-for="lang in langs" 
      :key="lang.key" 
      @click="changeLang(lang.key)"
      :class="['lang', curLang === lang.key ? 'lang-active' : '']">
        {{ lang.title }}
    </span>
  </div>
  <ul class="list">
    <li v-for="item in data" :key="item">
      <span class="title">{{ item.title }}: &nbsp;</span>
      <span>{{ $t(item.des) }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { data } from './data'
import { locale, langs, setLocale } from '../index'

let curLang = ref(locale)
function changeLang(lang) {
  setLocale(lang)
}
</script>
<style lang="less" scoped>
ul {
  text-align: left;
}
.lang {
  margin-right: 20px;
}
.lang-active {
  color: blue;
}
</style>