// promise 任务并发数量控制

// 为不对元素组做修改，两种方案：
// 1. 对新数组做拷贝
// 2. 采用下标控制当前执行哪一项

// 前提，需要确保list中每一项执行过程后返回promise实例
// 方案1
// 对数组做拷贝
class Sheduler1 {
  constructor(
    list = [], 
    limitNum = 1, 
    callback = () => {},
    callbackFail = () => {}) {

    this.list = list
    this.limitNum = limitNum
    this.callback = callback
    this.callbackFail = callbackFail
    this.runNum = 0
    // 统计完成
    this.finishedNum = 0
    this.listLen = list.length
    // 记录当前任务下标，采用方案2
    this.taskList = []
    this.cloneList()
    this.taskStart()

  }
  cloneList() {
    for(let i = 0, len = this.list.length; i < len; i++) {
      this.taskList.push(this.addTask(this.list[i]))
    }
  }
  // 包装成promise实例
  addTask(task) {
    return () => {
      return new Promise(resolve => {
        typeof task === 'function' ? resolve(task()) : resolve(task)
      })
    }
  }
  taskStart(){
    let canRunNum = this.limitNum - this.runNum
    const len = this.taskList.length
    if(len === 0 ) return 
    canRunNum = canRunNum > len ? len : canRunNum
    for(let i = 0; i < canRunNum; i++) {
      const task = this.taskList.shift()
      this.excute(task)
      this.runNum++
    }
  }
  excute(task) {
    // 需要考虑，如果task返回不是promise，该如何处理？
    console.log('task', task);
    task().then((res) => {
      console.log('task-then',res);
      this.runNum--
      this.finishedNum++
      if(this.listLen === this.finishedNum) {
        this.callback()
      }
      this.taskStart()
    }).catch(err => {
      console.log('shedule err for task: ', err)
    })
  }
}

// 方案2. 采用下标控制
class Sheduler {
  constructor(
    list = [], 
    limitNum = 1, 
    callback = () => {},
    callbackFail = () => {}) {

    this.list = list
    this.limitNum = limitNum
    this.callback = callback
    this.callbackFail = callbackFail
    this.runNum = 0
    // 统计完成
    this.finishedNum = 0
    this.listLen = list.length
    // 记录当前任务下标，采用方案2
    this.curTaskIndex = 0

    this.taskStart()

  }
  // 包装成promise实例
  addTask(task) {
    return () => {
      return new Promise(resolve => {
        typeof task === 'function' ? resolve(task()) : resolve(task)
      })
    }
  }
  taskStart(){
    let canRunNum = this.limitNum - this.runNum
    for(let i = 0; i < canRunNum && this.curTaskIndex < this.listLen; i++) {
      let task = this.list[this.curTaskIndex++]
      task = this.addTask(task)
      this.excute(task)
      this.runNum++
    }
  }
  excute(task) {
    // 需要考虑，如果task返回不是数组，该如何处理？
    task().then((res) => {
      console.log('task-then',res);
      this.runNum--
      this.finishedNum++
      if(this.listLen === this.finishedNum) {
        this.callback()
      }
      this.taskStart()
    }).catch(err => {
      console.log('shedule err for task: ', err)
    })
  }
}





export {
  Sheduler
}