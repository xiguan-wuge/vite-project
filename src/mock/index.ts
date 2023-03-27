/**
 * mock 初始化配置
 */
import Mock from 'mockjs'
import {baseURL} from '@/api/index'
console.log('baseURL', baseURL);

let configArray:any[] = []
export function initMock() {
  console.log('initMock')
  // 设置拦截ajax请求的相应时间
  Mock.setup({
    timeout: '200-600'
  });

  const files = import.meta.globEager('../mock/*.ts')
  console.log('files', files);
  
  for(const key in files) {
    console.log('key', key)
    const item = files[key]
    if(key !== '../mock/index.ts') {
      configArray.push(item.default)
    }
  }
  console.log('configArray', configArray);

  configArray.forEach(item => {
    for(let [path, target] of Object.entries(item)) {
      console.log('path', path);
      console.log('target', target);
      const protocol = path.split('|')
      console.log('protocol', protocol);
      
      Mock.mock(new RegExp('^' + baseURL+protocol[1]), protocol[0], target);

    }
  })
  
}

