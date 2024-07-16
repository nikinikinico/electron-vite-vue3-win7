import {
  app,
  BrowserWindow,
  session,
  ipcMain,
  globalShortcut,
  IpcMainEvent
} from 'electron'
import Store from 'electron-store'
import path from 'node:path'
import { checkUpdate } from './appVersion'
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

const store = new Store()
Store.initRenderer() // 如果未在主进程创建实例，要在渲染层中使用时，需要进行初始化
let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  session.defaultSession.loadExtension(
    path.resolve(__dirname, '../plugins/vuetools6.5.1')
  )
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
      // nodeIntegration:true,
      // contextIsolation:false
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  // 打开配置页面
  globalShortcut.register('CommandOrControl+Shift+F', () => {
    win?.webContents.send('openConfig')
  })
  //在编辑器中打开系统配置
  globalShortcut.register('CommandOrControl+Shift+Alt+L', () => {
    store.openInEditor()
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

/**
 * ipc通信
 */
/**打开控制台 */
ipcMain.on('openDevtools', (event: Electron.IpcMainEvent) => {
  event.sender.openDevTools()
})

/**获取electron-store的配置文件 */
ipcMain.handle(
  'getStore',
  (_event: Electron.IpcMainInvokeEvent, arg: string) => {
    return store.get(arg)
  }
)
/**
 * 版本更新检测
 */
ipcMain.handle('check-update', (e: any) => {
  // 获取发送通知的渲染进程窗口
  const currentWin = getWindowByEvent(e)
  // 升级校验
  checkUpdate(currentWin)
})
/**设置electron-store的配置文件 */
ipcMain.on(
  'setStore',
  (_event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
    ;(store.set as (...args: any[]) => void)(...args)
  }
)

/**
 * 通过窗口事件获取发送者的窗口
 * @param event ipc发送窗口事件
 */
function getWindowByEvent(event: IpcMainEvent): BrowserWindow | null {
  const webContentsId = event.sender.id
  for (const currentWin of BrowserWindow.getAllWindows()) {
    if (currentWin.webContents.id === webContentsId) {
      return currentWin
    }
  }
  return null
}
