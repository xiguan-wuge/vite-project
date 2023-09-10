import {ref} from 'vue'

export function useMouse() {
  console.log('useMouse');
  
  const x = ref(0)
  const y = ref(0)
  window.addEventListener('mousemove', (e) => {
    // console.log('e', e);
    
    x.value = e.x
    y.value = e.y
    // console.log('y',y);
    
  })
  return {
    x,
    y
  }
}