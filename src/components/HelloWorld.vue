<script setup lang="ts">
import { ref,defineProps } from 'vue'
// import bullet from './bullet.vue'
import pullLoad from './pullLoad/pullLoad.vue'
import virtualList from './virtualList/virtualList.vue'
import largeFileUpload from './largeFileUpload/fileUpload.vue'
import bulletLoop from '@/components/bulletLoop/bulletLoop.vue'
import lazyLoad from '@/components/lazyLoad/lazyLoad.vue'
import TSwitch from '@/components/switch/switch.vue'
import mutilDialog from '@/components/mutilDialog/mutilDialog.vue'
import hookDemo from '@/hooks/demo.vue'
// defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->
  <!-- <mutil-dialog></mutil-dialog> -->
  <hook-demo></hook-demo>
  <bullet></bullet>
  <span style="margin:20px; padding: 10px;background-color: pink;display: inline-block;">行内标签</span>
  <span style="margin:20px; padding: 10px; font-size: 20px;background-color: pink;display: inline-block;">行内标签</span>
  <!-- <span style="margin:20px; padding: 10px;background-color: pink;">行内标签</span> -->
  <span style="margin:20px; padding: 10px;background-color: pink;display: inline-block;"></span>
  <!-- <bulletLoop></bulletLoop> -->

  <!-- <pull-load></pull-load> -->
  <!-- <hr> -->
  <!-- <virtual-list></virtual-list>
  <large-file-upload></large-file-upload>
  <lazyLoad></lazyLoad>
  <t-switch></t-switch> -->
  
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
