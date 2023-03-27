const http = require('http')

const server = http.createServer()
server.on('request', async (req, res) => {
  console.log('req', req.url);
  
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if(req.url === '/getUserInfo') {
    res.statusCode = 200
    res.end(JSON.stringify({
      code: 1,
      data: {
        name: '张三'
      },
      message: '200'
    }))
    return
  }
})

server.listen(8091, () => {
  console.log(`server run at: http://localhost:8091`)
})