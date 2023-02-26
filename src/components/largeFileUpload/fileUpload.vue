<template>
  <div>
    <h2>大文件上传</h2>
    <input type="file" @change="handleFileChange">
    <br><br>
    <button @click="handleUpload">upload</button>
    &nbsp;&nbsp;
    <button @click="handlePause">pause</button>
    &nbsp;&nbsp;
    <button @click="handleDelete">delete</button>
    &nbsp;&nbsp;

    <div class="caculate-percentage">
      <h3>上传进度</h3>
      <p class="text">分片进度：{{hashPercentage}}%</p>
      <p class="text">分片数量：{{partCount}}</p>
      <p class="text">生成分片花费时间：{{createFileChunkTime}}毫秒</p>
      <p class="text">文件大小：{{fileSize}}</p>

      <br>
      <div class="text">总体上传进度：{{fakeUploadPercentage}}%
        <br>
        上传总花费时间：{{uploadFileTime}}毫秒
        <div class="progress">
          <div class="progress-inner" :style="{width: fakeUploadPercentage+'%'}"></div>
        </div>
        </div>
      <br>
      <div class="sub-progress">
        <p class="text">各分片上传进度</p>
        <p v-for="item in fileData" :key="item.hash">
          分片hash：{{item.hash}} -- 分片size: {{item.size}} --- 上传进度：{{item.percentage}}%
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, computed, watch} from 'vue'
import {Sheduler} from './sheduler'

// const url = 'http://localhost:3005'
const url = 'http://192.168.31.158:3005'
const SIZE = 10 * 1024 * 1024
const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}
const container = reactive({
  file: null,
  hash: '',
  worker: null
})
const fileData = ref([])
// 请求列表
let requestList = reactive([])
// 当前状态
const status = ref(Status.wait)
// hash 生成 百分比
const hashPercentage = ref(0)

const partCount = computed(() => {
  return fileData.value.length || 0
})

// 上传总进度(假的)
// 当暂停时会取消 xhr, 导致进度条后退，所以需要定义一个假的进度
const fakeUploadPercentage = ref(0)

// 真实总进度
const uploadPercentage = computed(() => {
  if(!container.file || !fileData.value.length) return 0
  const loaded = fileData.value
    .map(item => item.size * item.percentage)
    .reduce((acc, cur) => acc + cur)
  return parseInt((loaded / container.file.size).toFixed(2))
})
// 上传中才允许更新上传进度
// 场景：本地选取第二个文件，但未上传时，由于文件size已更新，会导致进度条变化，
// 实际上，进度条应该只在上传过程中更新
const onUploading = ref(false)
watch(
  () => uploadPercentage.value,
  (val) => {
    if(
      (val === 0 || val > fakeUploadPercentage.value) 
      && onUploading.value === true
    ) {
      fakeUploadPercentage.value = val
    }
  }
)
// 处理input change 事件
const fileSize = ref('0')
// 将文件大小（bit）转换成对应的单位（KB | M）
function checkFileSize(size) {
  let val = '0'
  if(size < 1000) {
    val = size + '字节'
  } else if(size < 1000000) {
    val = (size / 1000).toFixed(0) + 'KB'
  } else if(size < 1000000000) {
    val = (size / 1000000).toFixed(2) + 'M'
  } else {
    val = (size / 1000000000).toFixed(2) + 'G'
  }
  return val
}
const isNewFile = ref(false) // 标识是否重新选择文件，避免重新生成文件hash
function handleFileChange(e) {
  const [file] = e.target.files
  console.log('file', file);
  
  if(!file) return
  resetData()
  container.file = file
  isNewFile.value = true
  fileSize.value = checkFileSize(file.size)
}


let fileChunkList = [] // 暂存文件chunk，续传时，减少重复生成
const createFileChunkTime = ref(0)
async function handleUpload() {
  if(!container.file) return
  // status.value = Status.uploading
  // 优化，未重新选择文件或者续传时 ，不用再生成文件hash
  if(hasPuased.value !== true && isNewFile.value === true) {
    const startTime = Date.now()
    fileChunkList = createFileChunk(container.file)
    console.log('fileChunkList', fileChunkList);
    container.hash = await caculateHash(fileChunkList)
    const endTime = Date.now()
    createFileChunkTime.value = endTime - startTime 
    isNewFile.value = false
  }
  hasPuased.value = false
  
  
  // 判断是否已经上传过了
  const {shouldUpload, uploadedList} = await verifyUpload(
    container.file.name,
    container.hash
  )
  if(!shouldUpload) {
    console.log('skip upload：file upload success, check /target directory')
    status.value = Status.wait
    alert('已经上传过该文件！')
    return
  }
  fileData.value = fileChunkList.map(({file}, index) => {
    const partHash = container.hash + '-' + index
    return {
    chunk: file,
    index,
    // 文件名 + 数组下标
    hash: partHash,
    fileHash: container.hash,
    size: file.size,
    percentage:uploadedList.includes(partHash) ? 100 : 0
  }})
  console.log('fileData', fileData.value)

  await uploadChunks(uploadedList)
}

// 生成文件hash 采用webWorker
function caculateHash(fileChunkList) {
  return new Promise(resolve => {
    container.worker = new Worker('/hash.js')
    // console.log('container.worker', container.worker)
    container.worker.postMessage({fileChunkList})
    container.worker.onmessage = e => {
      const {percentage, hash} = e.data
      hashPercentage.value = parseInt(percentage)
      if(hash) {
        resolve(hash)
      }
    }
  })
}

// 根据hash验证文件是否曾经已经被上传过
// 若没有上传过，才进行上传
async function verifyUpload(filename, fileHash) {
  const {data} = await request({
    url: `${url}/verify`,
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      filename,
      fileHash
    }),
    onProcess: () => {},
    requestList: []
  })
  return JSON.parse(data)
}

// 通知服务端合并切片
async function mergeRequest() {
  console.log('mergeRequest');
  
  const {data} = await request({
    url: `${url}/merge`,
    method: 'post',
    headers: {
      "content-type": 'application/json'
    },
    data: JSON.stringify({
      filename: container.file.name,
      fileHash: container.hash,
      size: SIZE
    }),
    onProcess: () => {},
    requestList: []
  })
  alert('文件上传完毕')
}
// 文件上传 xhr
function request({
  url,
  method = 'post',
  data,
  headers = {},
  onProcess = e => e,
  requestList
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProcess
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = e => {
      // console.log('onload-e', e)
      // 将请求成功的 xhr 从列表中删除
      if(requestList && requestList.length) {
        const xhrIndex = requestList.findIndex(item => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      console.log('e.target.response', e.target.response)
      resolve({
        data: e.target.response
      })
    }

    // 暴露当前 xhr 给外部，以便后续的暂停
    if(requestList) {
      requestList.push(xhr)
    }
  })
}

// 生成切片文件
function createFileChunk(file, size = SIZE) {
  const fileChunkList = []
  let cur = 0
  while(cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + size)
    })
    cur += size
  }
  return fileChunkList
}

// 上传切片, 同时过滤已经上传的切片
const uploadFileTime = ref(0)
async function uploadChunks(uploadedList = []) {
  const filtersArr = fileData.value
    .filter(({hash}) => !uploadedList.includes(hash))

  const mapArr = filtersArr.map(({chunk, hash, index}) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash+'')
      formData.append('filename', container.file.name)
      formData.append('fileHash', container.hash)
      return {
        formData,
        index
      }
    })
  
  const requestListTemp = mapArr.map(({formData, index}) => {
      return () => {
        return request({
          url: url,
          method: 'post',
          data: formData,
          headers: {},
          onProcess: createProgressHandler(fileData.value[index]),
          requestList: requestList
        })
      }
    })
  const startTime = Date.now()
  // await Promise.all(requestListTemp)
  console.log('uploadedList.length0', uploadedList.length);
  console.log('requestListTemp.length0', requestListTemp.length);
  console.log('fileData.value.length0', fileData.value.length);
  // 发送上传请求，并发控制
  onUploading.value = true

  await sendUploadReqest(requestListTemp)
  onUploading.value = false
  const endTime = Date.now()
  uploadFileTime.value = endTime - startTime
  console.warn('uploadFileTime', uploadFileTime.value)
  // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时，合并切片
  console.log('uploadedList.length', uploadedList.length);
  console.log('requestListTemp.length', requestListTemp.length);
  console.log('fileData.value.length', fileData.value.length);
  
  if(uploadedList.length + requestListTemp.length === fileData.value.length) {
    await mergeRequest()
  }
}
// 并发请求，控制请求数量为4个
function sendUploadReqest(list) {
  return new Promise((resolve, reject) => {
    new Sheduler(list, 4, resolve, reject)
  })
}

// 用闭包保存每个chunk的进度数据
function createProgressHandler(item) {
  return e => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100))
  }
}

// 重置数据
function resetData() {
  requestList.forEach(xhr => {
    console.log('xhr', xhr);
    
    if(xhr.abort) {
      xhr.abort()
    }
  })
  requestList = []
  if(container.worker) {
    container.worker.onmessage = null
  }
}

// 暂停上传文件
const hasPuased = ref(false)
function handlePause() {
  status.value = Status.pause
  hasPuased.value = true
  resetData()
}

// 删除当前文件
async function handleDelete() {
  const {data} = await request({
    url:`${url}/delete`
  })
  if(JSON.parse(data).code === 0) {
    alert('删除成功！')
  }
}
</script>
<style lang="less" scoped>
.progress {
  margin: 0 auto;
  width: 300px;
  height: 20px;
  background-color: rgb(65, 62, 62);
  border-radius: 10px;
  overflow: hidden;
  .progress-inner {
    height: 100%;
    background-color: blue;
  }
}
</style>