<template>
  <div class="swipe" style="width: 400px; overflow: visible">
    <div class="content" :style="contentStyle">
      <div class="swipe-item" :style="firstStyle" style="width: 400px">1</div>
      <div class="swipe-item" style="width: 400px">2</div>
      <div class="swipe-item" style="width: 400px">3</div>
      <div class="swipe-item" style="width: 400px">4</div>
    </div>
  </div>
  <div>{{ currIdx }}</div>

  <button @click="next">next</button>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
const tranX = ref(0);
const firstStyle = ref("");
const duration = ref("500ms");
const contentStyle = computed(() => {
  return `transition-duration: ${duration.value}; transform: translateX(${tranX.value}px); width: 1600px;`;
});

// let timer;

const currIdx = ref(0);
let isSwiping = false;
function next() {
  if (currIdx.value !== 3) {
    // 矫正位置 类似于组件的 lockPosition
    if (isSwiping) {
      duration.value = "0";
      tranX.value = 0;
      isSwiping = false;
      // timer,但是此时会闪一下
      // 强制渲染
      // document.querySelector('.swipe')[0]?.clientHeight()
      // return
    }
    // 采用定时器 会有闪烁效果
    // timer && clearTimeout(timer)
    // timer = setTimeout(() => {
    requestAnimationFrame(() => {
      duration.value = "500ms";
      console.log("!==3");
      currIdx.value += 1;
      tranX.value = -currIdx.value * 400;
      firstStyle.value = "";
    });
    // }, 0)
    // 采用nexttick 未能实现无缝
    // nextTick(() => {
    //   duration.value = "500ms";
    //   console.log("!==3");
    //   currIdx.value += 1;
    //   tranX.value = -currIdx.value * 400;
    //   firstStyle.value = "";
    // });
  } else {
    console.log("333");
    // timer && clearTimeout(timer)
    // timer = setTimeout(() => {
    requestAnimationFrame(() => {
      currIdx.value = 0;
      tranX.value = -4 * 400;
      firstStyle.value = "transform: translateX(1600px);";
      isSwiping = true;
    });
    // })
    // currIdx.value = 0;
    // tranX.value = -4 * 400;
    // firstStyle.value = "transform: translateX(1600px);";
    // isSwiping = true;
  }
}
</script>

<style lang="less" scoped>
.swipe {
  width: 400px;
  height: auto;
}
.content {
  display: flex;
  background-color: pink;
}
.swipe-item {
  width: 400px;
  height: 300px;
  background-color: blue;
  border: 1px solid red;
  flex-shrink: 0;
  text-align: center;
  line-height: 300px;
  color: #fff;
}
</style>
