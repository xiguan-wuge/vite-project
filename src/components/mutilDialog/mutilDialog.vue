<template>
  <div class="multi-dialog" v-show="isVisivle">
    <div class="content" :style="contentStyle">
      this is content
      <div class="week month">
        <div class="wex-day day" v-for="day in week" :key="day">{{ day }}</div>
      </div>
      <div class="month">
        <div class="day" v-for="day in monthData" :key="day">{{ day }}</div>
      </div>
      <button @click="handleConfirm">{{ confirmName }}</button>
    </div>
    <div class="mask" >

    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

// 设计日期
let currMonth = 0, currYear = 0, currDay = 0
const now = new Date()
currYear = now.getFullYear()
currMonth = now.getMonth()
currDay = now.getDate()

function nextMonth(year, month) {
  if(month === 11) {
    year += 1
    month = 0
  } else {
    month += 1
  }
  return {
    year, 
    month
  }
}
function getTotalDays(prev, next) {
  const preMonth = new Date(prev.year, prev.month)
  const nextMonth = new Date(next.year, next.month)
  return (nextMonth.getTime() - preMonth.getTime()) / (1000 * 60 * 60 * 24)
}
const totalDays = getTotalDays({year: currYear, month: currMonth}, nextMonth(currYear, currMonth))
console.log('totalDays', totalDays);

const monthData = ref([])
function numToArr(num) {
  return Array(num).fill('').map((_,index) => index + 1)
}
const tempMonth: (number|string)[] = numToArr(totalDays)
console.log('tempMonth',tempMonth
);
function getFirstDayInWeex(year, month) {
  return new Date(year, month).getDay()
}
const firstDay = getFirstDayInWeex(currYear, currMonth)
console.log('firstDay', firstDay
);

numToArr(firstDay === 0 ? 0 : firstDay - 1).forEach(item => {
  tempMonth.unshift('')
})

monthData.value = tempMonth
const week = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '日',
]

const confirmName = ref('confirm')

const tasks = [
  {
    btnName: '确定',
    style: {
      backgroundColor: 'green'
    },
    onConfirm: () => {
      console.log('confirm1')
    }
  },
  {
    btnName: '确定2',
    style: {
      backgroundColor: 'blue',
      width: '300px',
      height: '500px'
    },
    onConfirm: () => {
      console.log('confirm2')
    }
  }
]
const taskLen = tasks.length
let currIndex = 0
const isVisivle = ref(true)
const contentStyle = ref({})
function handleConfirm() {
  if(currIndex >= taskLen) {
    isVisivle.value = false
    return
  }
  excueTask()
  
}
function excueTask(){
  const {btnName, style, onConfirm} = tasks[currIndex]
  onConfirm()
  confirmName.value = btnName
  contentStyle.value = style
  currIndex++
}

// 初始化状态
excueTask()

</script>

<style lang="less" scoped>
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: pink;
  color: white;
  z-index: 2002;
}
.month {
  width: 140px;
  background-color: lightblue;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.day {
  // display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: lightgray;
  text-align: center;
  line-height: 20px;
  color: black;
  font-size: 14px;
  
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, .8);
}
</style>