<template>
  <van-swipe class="my-swipe"  indicator-color="white" ref="swipeWrapper">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>

<button @click="prev">prev</button>
<button @click="next">next</button>

<br>
<swipe></swipe>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import swipe from './swipe.vue'

const swipeWrapper = ref()
console.log('swipeWrapper', swipeWrapper);
function next() {
  swipeWrapper.value.next()
}
function prev() {
  swipeWrapper.value.prev()
}
</script>

<style lang="less" scoped>
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    border: 1px solid red;
  }
  .van-swipe__track {
    background-color: #42b983;
  }
}
</style>