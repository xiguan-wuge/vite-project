const fse = require('fs-extra')
const multiparty = require('multiparty')
const path = require('path')

// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, 'target')


// 提取文件后缀名
const extractExt = filename => 
  filename.slice(filename.lastIndexOf('.'), filename.length)

// 创建临时文件夹 用于临时存储 chunk
// 添加chunkDir 前缀与文件名 做区分
const getChunkDir = fileHash =>
  path.resolve(UPLOAD_DIR, `chunkDir_${fileHash}`)

// 提取body
const resolvePost = req => {
  return new Promise(resolve => {
    let chunk = ''
    req.on('data', data => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}

// 返回已上传的所有切片名
const createUploadedList = async fileHash => {
  return fse.existsSync(getChunkDir(fileHash))
    ? await fse.readdir(getChunkDir(fileHash))
    : []
}

// 合并切片
const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = getChunkDir(fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  // 根据切片下标进行排序
  // 若直接读取当前目录的获取的顺序会错乱、
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])

  // 并发写入文件
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 根据size 在指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size
        })
      )
    })
  )

  // 合并后删除保存切片的目录
  fse.rmdirSync(chunkDir)
}

// 写入文件流
const pipeStream = (path, writeStream) => {
  return new Promise(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      fse.unlinkSync(path)
      resolve()
    })
    readStream.pipe(writeStream)
  })
}
// 定义合并后文件的文件名
function defineFileName(filename, fileHash) {
  const ext = extractExt(filename)
  // return path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)

  // 修改：为便于于本地快速查找文件，保留文件名。 tip: 实际运用中不保留文件名
  const partIndex = filename.lastIndexOf('.')
  const namePart = filename.slice(0, partIndex)
  return path.resolve(UPLOAD_DIR, `${namePart}-${fileHash}${ext}`)
}

module.exports = class {
  // 合并切片
  async handleMerge(req, res) {
    const data = await resolvePost(req)
    const {fileHash, filename, size} = data
    const filePath = defineFileName(filename, fileHash)
    await mergeFileChunk(filePath, fileHash, size)
    res.end(
      JSON.stringify({
        code: 0,
        message: 'file merged success'
      })
    )
  }

  // 删除所有文件
  async deleteFiles(req, res) {
    await fse.remove(path.resolve(UPLOAD_DIR))
    res.end(
      JSON.stringify({
        code: 0,
        message: 'file delete success'
      })
    )
  }

  // 处理切片
  async handleFormData(req, res) {
    const multipart = new multiparty.Form()

    multipart.parse(req, async (err, fields, files) => {
      if(err) {
        console.error('multipart.parse-err', err)
        res.status = 500
        res.end('process file chunk failed')
        return
      }
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [fileHash] = fields.fileHash
      const [filename] = fields.filename
      const filePath = path.resolve(
        UPLOAD_DIR,
        `${fileHash}${extractExt(filename)}`
      )
      // 创建临时文件夹用于临时存储chunk
      const chunkDir = getChunkDir(fileHash)
      const chunkPath = path.resolve(chunkDir, hash)

      // 文件存在 则直接返回
      if(fse.existsSync(filePath)) {
        res.end('file exist')
        return
      }

      // 切片存在 则直接返回
      if(fse.existsSync(chunkPath)) {
        res.end('chunk exist')
        return
      }

      // 切片目录不存在，则创建切片目录
      if(!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }

      // fs-extra 的 rename方法 在windows 平台会有权限问题
      // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
      await fse.move(chunk.path, path.resolve(chunkDir, hash))
      res.end('received file chunk')
    })
  }

  // 验证是否已经长传/已上传切片下标
  async handleVerifyUpload(req, res) {
    const data = await resolvePost(req)
    const {fileHash, filename} = data
    const filePath = defineFileName(filename, fileHash)
    if(fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      )
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(fileHash)
        })
      )
    }
  }
}