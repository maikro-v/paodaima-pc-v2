const Ftp = require('./Ftp')

const HOST = '39.107.86.114'
const USERNAME = 'root'
const PASSWORD = 'Zhuanyong1'
const PORT = 22

const ftp = new Ftp()

ftp.connect({
  host: HOST,
  username: USERNAME,
  password: PASSWORD,
  port: PORT
}).then(async(conn) => {
  try {
    const remoteRoot = '/home/www/paodaima/views/pc/'
    await ftp.removeFile(remoteRoot, ['.nuxt', 'server', 'static', 'nuxt.config.js', 'package.json'])
    await ftp.uploadDir('server', remoteRoot + 'server')
    await ftp.uploadDir('.nuxt', remoteRoot + '.nuxt')
    await ftp.uploadDir('static', remoteRoot + 'static')
    await ftp.uploadFile('nuxt.config.js', remoteRoot + 'nuxt.config.js')
    await ftp.uploadFile('package.json', remoteRoot + 'package.json')
    ftp.end()
  } catch (e) {
    console.log(e)
  }
}).catch((err) => {
  console.log(err)
})
