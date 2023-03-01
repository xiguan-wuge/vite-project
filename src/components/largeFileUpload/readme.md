## 大文件上传

### 核心思路：
  - 前端：
    - 将文件切片，生成对应的hash值
    - 并发上传，待上传完成时，通知服务端根据hash值+index， 将分片文件合并成一个整文件
  - 服务端：
    - 接收客户端传过来的分片文件，根据hash值，创建临时文件夹，暂存对应的分片文件
    - 接收到客户端发来的合并请求，创建读写流，根据分片hash和index值，将分片文件写入到一个整文件中

### 知识点
  - 前端：
    - 如何切分文件？ 文件分割大小，Blob.prototype.slice
    - 如何生成分片hash？ 第三方工具 spark-MD5.js，webWorker 在后台进行hash生成
    - promise 并发数量控制，发送上传请求
  
  - 后端
    - node服务启动，创建对应接口处理逻辑
    - 接收切片，获取对应信息，暂存到硬盘。multiparty获取文件信息， move方法写入文件
    - 合并切片到一个文件。 根据hash+index 对分片文件进行排序，createReadStream方法创建写入流，pipe方法并入目标文件
    - 合并后删除分片文件夹
    - 已上传文件的插叙和判断

### 关键词
  前端分片、后台切片hash生成、异步并发控制上传、断点上传、文件秒传
  后端文件分片文件暂存、合并分片、分片查询