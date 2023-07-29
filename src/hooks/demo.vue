<template>
  <p>num1: <input v-model.numer="num1" style="width: 100px;"/></p>
  <p>num2: <input v-model.numer="num2" style="width: 100px;"/></p>

  <div>
    <span>加法等于：{{ addNum }}</span>
    <br>
    <span>减法等于：{{ subNum }}</span>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import useAdd from './useAdd'
import {useSub} from './useSub'


const num1 = ref(1)
const num2 = ref(2)

const {addNum, addFn} = useAdd(num1, num2)
addFn(num1.value, num2.value)

const {subNum, subFn} = useSub(num1, num2)
subFn(num1.value, num2.value)
</script>