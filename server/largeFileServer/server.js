const http = require('http')

const Controller = require('./controller')

const controller = new Controller()



const server = http.createServer()
server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if(req.method === 'OPTIONS') {
    res.status = 200
    res.setHeader('cache-control', 'max-age=200000')
    res.end()
    return
  }

  if(req.url === '/') {
    await controller.handleFormData(req, res)
  }

  if(req.url === '/merge') {
    await controller.handleMerge(req, res)
  }

  if(req.url === '/verify') {
    await controller.handleVerifyUpload(req, res)
    return
  }

  if(req.url === '/delete') {
    await controller.deleteFiles(req, res)
  }

})

server.listen(3005, () => {
  console.log('server run at http://localhost:3005')
})