<template>
  <div class="lazy-load">
    <!-- 知乎评论占位图 -->
    <img :src="tempImg" alt="" class="img-item" :data-src="tempImg">
    
    <img v-for="item in list" :src="defaultImg" :data-src="item" alt="" class="img-item" >
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {list, defaultImg} from './list'
import tempImg from '@/assets/tempImg.svg'
onMounted(() => {
  // const root = document.querySelector('.lazy-load')
  const root = document.querySelector('.img-item')
  console.log('root', root);
  const options = {
    root: root,
    threshold: [0], // 交汇处
    rootMargin: '0px', // 对视口进行收缩和扩张
  }
  const lazyIntersection = new IntersectionObserver(entries => {
    // entries: 监听的节点数组对象
    entries.forEach((item, index) => {
      // console.log('item', item);
      // if(item.isIntersecting) {
      if(item.intersectionRatio > 0){
        // 进入可视区域
        item.target.src = item.target.getAttribute('data-src')
        // 停止进行观察
        lazyIntersection.unobserve(item.target)
      }
    })
  }, options)

  // const data = Array.from(root.children)
  const data = Array.from(document.querySelectorAll('img'))

  console.log('data', data);

  data.forEach(item => {
    lazyIntersection.observe(item)
  })
  

})


</script>

<style lang="less" scoped>
.lazy-load {
  width: 300px;
  // height: 1000px;
  background-color: pink;
  overflow-y: scroll;
}
.img-item {
  width: 100%;
  min-height: 100px;
  height: auto;
}
</style>