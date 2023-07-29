<template>
  <div class="switch">
    <input type="checkbox"
      class="switch-input"
      v-model="checkBoxValue"
      :disabled="disabled">
    <span class="switch-label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// 获取props
const props = defineProps({
  disabled: Boolean,
  value: Boolean,
  color: String,
  initCallback: Boolean 
})
// 获取emit
const emits = defineEmits(['callback'])
const checkBoxValue = ref(props.value)

function callback(val:boolean) {
  // 执行emit
  emits('callback', val)
}

onMounted(() => {
  props.initCallback && callback(props.value)
})


// const disabled = ref(false)
</script>