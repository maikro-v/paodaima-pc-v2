const fs = require('fs')
const path = require('path')
const Client = require('ssh2')
const ProgressBar = require('progress')
const ora = require('ora')

class Ftp {
  constructor() {
    this.conn = new Client()
  }

  connect(options) {
    return new Promise((resolve, reject) => {
      this.conn.on('ready', () => {
        resolve(this)
      }).connect(options)

      this.conn.on('error', (err) => {
        reject(err)
      })
    })
  }

  end() {
    this.conn.end()
  }

  /*
  * 删除文件
  * @param { String } remotePath 远程文件路径
  * @param { String | Array } file 删除的一个或多个文件
  * */
  removeFile(remotePath, file = '') {
    // 加载动画
    const spinner = ora({
      text: '正在删除文件',
      color: 'green'
    }).start()

    let fileStr = ''
    if (typeof file === 'string') {
      fileStr += `${file}`
    } else if (typeof file === 'object') {
      file.forEach(el => {
        fileStr += `${el} `
      })
    }
    return new Promise((resolve, reject) => {
      this.conn.exec(`
        cd ${remotePath}
        rm -rf ${fileStr}
      `, (err, stream) => {
        if (err) {
          spinner.fail('文件删除失败\n')
          reject(err)
        } else {
          spinner.succeed('文件删除成功\n')
          resolve(stream)
        }
        spinner.clear()
      })
    })
  }

  /**
   * 描述：上传文件
   * @param { String } localPath 本地路径
   * @param { String } remotePath 远程路径
   */
  uploadFile(localPath, remotePath) {
    return new Promise((resolve, reject) => {
      this.conn.sftp((err, sftp) => {
        if (err) {
          reject(err)
        } else {
          sftp.fastPut(localPath, remotePath, (err, result) => {
            sftp.end() // 关闭通道
            resolve(err, result)
          })
        }
      })
    })
  }

  /*
  * 上传文件夹到远程目录
  * @param { String } localDir 本地路径
  * @param { String } remoteDir 远程路径
  * */
  uploadDir(localDir, remoteDir) {
    return new Promise(async (resolve, reject) => {
      try {
        const info = this.getFileAndDirList(localDir)
        // 进度条
        const bar = new ProgressBar('正在上传文件 [:bar] :current/:total :percent', {
          complete: '=',
          incomplete: '',
          width: 20,
          total: info.files.length
        })
        const spinner = ora()

        // 创建远程目录
        for (let i = 0, len = info.dirs.length; i < len; i++) {
          const to = path.join(remoteDir, info.dirs[i].slice(localDir.length+1)).replace(/[\\]/g, '/')
          await this.exec(`
            mkdir -p ${to}
            exit
          `)
        }

        // 上传文件
        for (let i = 0, len = info.files.length; i < len; i++) {
          const to = path.join(remoteDir, info.files[i].slice(localDir.length+1)).replace(/[\\]/g, '/')
          bar.tick() // 进度条
          await this.uploadFile(info.files[i], to)
        }

        spinner.succeed('文件上传成功\n')
        spinner.clear()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  /*
  * 执行exec命令
  * */
  exec(cmd) {
    return new Promise((resolve, reject) => {
      this.conn.exec(cmd, (err, stream) => {
        if (err) {
          reject(err)
        } else {
          resolve(stream)
        }
      })
    })
  }

  /*
  * shell
  * */
  shell(cmd) {
    return new Promise((resolve, reject) => {
      this.conn.shell((err, stream) => {
        if (err) {
          reject(err)
        } else {
          stream.on('close', () => {
            console.log('shell :: close')
            stream.end()
          }).on('data', (data) => {
            console.log(data)
          })
          resolve(stream)
        }
      })
    })
  }

  /*
   * 获取window上的文件目录以及文件列表信息
   * @param { String } localDir 本地路径
   * */
  getFileAndDirList(localDir) {
    const dirs = []
    const files = []
    const dir = fs.readdirSync(localDir)
    for(let i = 0; i < dir.length; i ++){
      const p = path.join(localDir, dir[i])
      const stat = fs.statSync(p)
      if (stat.isDirectory()) {
        dirs.push(p)
        const children = this.getFileAndDirList(p)
        dirs.push(...children.dirs)
        files.push(...children.files)
      } else {
        files.push(p)
      }
    }
    return {
      files,
      dirs
    }
  }
}

module.exports = Ftp
