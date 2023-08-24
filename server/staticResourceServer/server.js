const http = require('http')
const path = require('path')
const fs = require('fs')
const zlib = require('zlib')

const typeList = {
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.html': 'text/html;charset=utf-8',
  '.js': 'application/javascript;charset=utf-8',
  '.css': 'text/css;charset=utf-8',
  '.svg':  'image/svg+xml'
}
const host = 'http://localhost'
const port = 8090

// 读取static下的项目列表
function getProjectList() {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, 'static')
    fs.readdir(dir, (err, data) => {
      if(err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
  
}
const server = http.createServer((req, res) => {
  if(req.url === '/' || req.url === '') {
  getProjectList().then(data => {
    const list = `<ul>
    ${data.map(item => {
      return `<li>
      <a href="${host}:${port}/${item}/index.html">${item}</a>
      </li>`
    }).join('')}
    </ul>`
    res.setHeader ("Content-Type", "text/html;charset=utf8");
    res.statusCode = 200
    res.end(`
    <h1>静态资源服务页</h1>
    </br>
    <h2>当前项目列表</h2>
    ${list}
    `)
  }).catch((err) => {
    console.log('getProjectList-err', err);
    res.setHeader ("Content-Type", "text/html;charset=utf8");
    res.statusCode = 200
    res.end(`<h1>静态资源服务页</h1>`)
  })
    return
  }
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
server.listen(port, () => {
  console.log(`server run at: ${host}:${port}`)
})