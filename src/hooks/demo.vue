<template>
  <!-- <p>num1: <input v-model.numer="num1" style="width: 100px;"/></p>
  <p>num2: <input v-model.numer="num2" style="width: 100px;"/></p>

  <div>
    <span>加法等于：{{ addNum }}</span>
    <br>
    <span>减法等于：{{ subNum }}</span>
  </div> -->
  <!-- <div class="temp" @mousemove="handleStart"> </div> -->
  <p>x: {{ x }}</p>
  <p>y: {{ y }}</p>
</template>

<script setup>
import {ref, toRef} from 'vue'
// import useAdd from './useAdd'
// import {useSub} from './useSub'

import {useMouse} from './mouse'
const {x, y} = useMouse()
// const mX = toRef(x)
// const mY = toRef(y)


// const num1 = ref(1)
// const num2 = ref(2)

// const {addNum, addFn} = useAdd(num1, num2)
// addFn(num1.value, num2.value)

// const {subNum, subFn} = useSub(num1, num2)
// subFn(num1.value, num2.value)

function handleStart(e) {
  console.log('e', e);
  const {x, y} = e
  console.log('x', x, y);
  
}
</script>
<style>
.temp {
  width: 300px;
  height: 300px;
  background-color: blue;
}
</style>