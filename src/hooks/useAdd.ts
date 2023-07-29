import {ref, watch} from 'vue'

const useAdd = (num1:number, num2:number) => {
  const addNum = ref(0)
  watch(
    [num1, num2],
    ([num1, num2]) => {
      addFn(num1, num2)
    }
  )
  const addFn = (num1:number, num2:number) => {
    addNum.value = Number(num1) + Number(num2)
  }
  return {
    addNum,
    addFn
  }
}

export default useAdd