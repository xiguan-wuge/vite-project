const http = require('http')
const path = require('path')
const fs = require('fs')
const zlib = require('zlib')

const typeList = {
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.html': 'text/html;charset=utf-8',
  '.js': 'application/javascript;charset=utf-8',
  '.css': 'text/css;charset=utf-8'
}

const server = http.createServer((req, res) => {
  console.log('url', req.url);
  const url = req.url === '/' ? '/index.html' : req.url
  const filePath = path.join(__dirname, 'static', url)
  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.log('readFile-err', err)
      res.statusCode = 404
      res.end('not found')
    } else {
      const ext = path.extname(filePath)
      if(typeList[ext]) {
        res.setHeader('content-type', typeList[ext])
        if(url.indexOf('index.html') === -1) {
          // 静态资源添加缓存,默认365天（参考dev环境中，静态资源的时间）
          res.setHeader('cache-control', 'max-age=31536000')
          const acceptEncodingValue = req.headers['accept-encoding'] || 'gzip'
          if(acceptEncodingValue.includes('gzip')) {
            res.setHeader('content-encoding', 'gzip')
            // 使用同步API直接压缩
            data = zlib.gzipSync(Buffer.from(data))
          }
        }
      }
      res.end(data)
    }
  })
})
server.listen(8090, () => {
  console.log(`server run at: http:localhost:8090`)
})