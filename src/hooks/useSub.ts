import {ref, watch} from 'vue'

export const useSub = (num1:number, num2:number) => {
  const subNum = ref(0)
  watch(
    [num1, num2],
    ([num1, num2]) => {
      subFn(num1, num2)
    }
  )
  const subFn = (num1:number, num2:number) => {
    subNum.value = Number(num1) - Number(num2)
  }
  return {
    subNum,
    subFn
  }
}
