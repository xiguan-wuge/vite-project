<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div v-for="item in listData" :key="item" class="item">
        {{item}}
      </div>
      <p v-if="noMore" class="no-more">no more!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {throttle} from '@/utils/index'

// 总数据
const resultData = (new Array(200).fill(1).map((item, index) => index + 1))
// 缓冲个数
const overScan = 5
// 展示的数据
const listData = ref([])
const wrapper = ref(null)
const content = ref(null)
const wrapperHeight = ref(0)
const visibleCount = ref(0)
const itemHeight = 50
const noMore = ref(false)

// 截取数据
const caculateRangeData = () => {
  // 计算偏移的数量
  const offsetCount = Math.floor(wrapper.value.scrollTop / itemHeight) + 1
  console.log('offsetCount', offsetCount)
  // 总高度
  const totalHeight = resultData.length * itemHeight
  // 开始索引
  const start = Math.max(0, offsetCount - overScan)
  console.log('start', start);
  
  // 结束索引
  const end = Math.min(resultData.length, offsetCount + visibleCount.value + overScan)
  console.log('end-------', end);
  
  if(end === resultData.length) {
    noMore.value = true
  } else {
    noMore.value = false
  }
  // 向上偏移
  const offsetTop = start * itemHeight
  // 设置空白 为了不可滚动
  content.value.style.marginTop = offsetTop + 'px'
  // 为了显示一个正常的进度条
  content.value.style.height = totalHeight - offsetTop + 'px'
  listData.value = resultData.slice(start, end)
}

onMounted(() => {
  const el = wrapper.value
  if(!el) return
  wrapperHeight.value = el.clientHeight
  // 计算可显示的数量
  visibleCount.value = Math.floor(wrapperHeight.value / itemHeight)
  const throttleFn = throttle(() => {
    caculateRangeData()
  },60)
  el.addEventListener('scroll', throttleFn)
  // el.addEventListener('scroll', () => {
  //   caculateRangeData()
  // })
  caculateRangeData()
})
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 300px;
  background-color: pink;
  overflow: scroll;
}
.item {
  line-height: 50px;
}
</style>
