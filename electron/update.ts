import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'
import log from 'electron-log' // 如果没有自己封装

let mainWindow: BrowserWindow | null
// 封装更新相关的进程通信方法
const sendUpdateMessage = (opt: { cmd: IPCOneWay; data: any }) => {
  if (!mainWindow) return
  mainWindow.webContents.send(opt.cmd, opt.data)
}
export const checkUpdate = (win: BrowserWindow | null) => {
  if (!win) return
  mainWindow = win
  // 关闭自动更新
  autoUpdater.autoDownload = false
  autoUpdater.forceDevUpdateConfig = true
  // 日志记录设置
  log.transports.file.level = 'debug'
  autoUpdater.logger = log
  // 监听升级失败事件
  autoUpdater.on('error', (error) => {
    sendUpdateMessage({
      cmd: 'update-error',
      data: error
    })
  })
  //监听发现可用更新事件
  autoUpdater.on('update-available', (message) => {
    sendUpdateMessage({
      cmd: 'update-available',
      data: message
    })
  })
  //监听没有可用更新事件
  autoUpdater.on('update-not-available', (message) => {
    sendUpdateMessage({
      cmd: 'update-not-available',
      data: message
    })
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', (progressObj) => {
    sendUpdateMessage({
      cmd: 'download-progress',
      data: progressObj
    })
  })
  //监听下载完成事件
  autoUpdater.on('update-downloaded', (releaseObj) => {
    sendUpdateMessage({
      cmd: 'update-downloaded',
      data: releaseObj
    })
    //退出并安装更新包
    autoUpdater.quitAndInstall()
  })

  //接收渲染进程消息，开始检查更新
  ipcMain.on('check-update', () => {
    //执行自动更新检查
    console.log('检查更新')
    autoUpdater.checkForUpdates()
  })

  // 触发更新
  ipcMain.on('update-app', () => {
    autoUpdater.downloadUpdate()
  })
}
