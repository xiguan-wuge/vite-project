<script setup lang="ts">
import { ref } from 'vue'
// import bullet from './bullet.vue'
// import pullLoad from './pullLoad/pullLoad.vue'
import virtualList from './virtualList/virtualList.vue'
// import largeFileUpload from './largeFileUpload/fileUpload.vue'
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <!-- <bullet></bullet> -->
  <!-- <pull-load></pull-load> -->
  <!-- <hr> -->
  <virtual-list></virtual-list>
  <!-- <large-file-upload></large-file-upload> -->
  
</template>

<style scoped lang="less">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
