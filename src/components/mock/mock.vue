<template>
  <div class="mock">
    this is mock
  </div>
</template>
<script lang="ts" setup>
import {onMounted} from 'vue'
// import axios from 'axios'
import {api} from '@/api/index.ts'

onMounted(() => {
  console.log('mock mounted');
  api({
    method:'get',
    url:'getUserInfo',   
  }).then(res => {
    console.log('res-', res.data)
  }).catch(err => {
    console.log('err-', err)
  })
  
})
</script>