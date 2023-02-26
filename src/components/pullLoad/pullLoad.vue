<template>
  <div class="wrapper" ref="target">
    <div class="content" ref="content">
      <div v-for="item in listData" :key="item" class="item">
        {{item}}
      </div>
      <p v-if="loading" class="loading">loading...</p>
      <p v-if="noMore" class="no-more">no more!</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {reactive, onMounted, ref} from 'vue'

  // 模拟后台数据
  const resultData = (new Array(100).fill(1).map((item, index) => index + 1))
  // 模拟获取后台数据
  function getLoadMoreData(pageNum:number, pageSize: number) {
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = resultData.slice(start, end)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(list)
      }, 1000)
    })
  }

  const pageSize = 15
  // 距离底部多少（px）时开始请求
  const threshold = 100
  const listData = reactive([])
  // dom
  const target = ref(null)
  const content = ref(null)
  const loading = ref(false)
  const noMore = ref(false)
  const pageNum = ref(1)

  // 获取数据
  const getData = async (pageNum) => {
    try {
      loading.value = true
      const items:Array<number> = await getLoadMoreData(pageNum, pageSize)
      console.log('items', items)
      // 判断是否没有更多数据了
      if(!items.length || items.length < pageSize) {
        noMore.value = true
      }
      listData.push(...items)
      loading.value = false
    } catch (err) {
      console.log('getData-err', err)
      loading.value = true
    }
  }

  onMounted(() => {
    const el = target.value
    const contentEl = content.value
    console.log('el', el)
    if(!el) return

    // 监听scroll事件
    el.addEventListener('scroll', () => {
      // 判断是否触底
      if(el.scrollTop + el.clientHeight > el.scrollHeight - threshold) {
        console.log('触底了')
        // 避免多次触底触发
        if(loading.value || noMore.value) {
          return
        }
        pageNum.value += 1
        getData(pageNum.value)
      }
    })
  })
  getData(pageNum.value)
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 300px;
  background-color: pink;
  overflow: scroll;
}
.item {
  line-height: 30px;
}
</style>