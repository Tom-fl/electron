import { BrowserWindow, Menu, app } from 'electron'
import { platform } from 'os'
import menuconfig from '../config/menu'
import config from '@config'
import setIpc from './ipcMain'
import { winURL, loadingURL } from '../config/StaticPath'
import axios from 'axios'
const qiaoC = require('qiao-config')
const _c = qiaoC.c()

var loadWindow = null
var mainWindow = null
setIpc.Mainfunc(config.IsUseSysTitle)

function createMainWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1700,
    minWidth: 1366,
    show: false,
    frame: config.IsUseSysTitle,
    titleBarStyle: platform().includes('win32') ? 'default' : 'hidden',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      // 如果是开发模式可以使用devTools
      devTools: process.env.NODE_ENV === 'development' || config.build.openDevTools,
      // devTools: true,
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin',
    },
  })
  // 这里设置只有开发环境才注入显示开发者模式
  if (process.env.NODE_ENV === 'development' || config.build.openDevTools) {
    menuconfig.push({
      label: '',
      submenu: [
        // {
        // label: '切换到开发者模式',
        // accelerator: 'CmdOrCtrl+I',
        // role: 'toggledevtools',
        // },
      ],
    })
  }
  // 载入菜单
  const menu = Menu.buildFromTemplate(menuconfig)
  Menu.setApplicationMenu(menu)
  mainWindow.loadURL(winURL)

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show()
    if (process.env.NODE_ENV === 'development' || config.build.devTools)
      mainWindow.webContents.openDevTools(true)
    if (config.UseStartupChart) loadWindow.destroy()
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('w-max', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('w-max', false)
  })
  mainWindow.on('closed', event => {
    let params = _c.config('dataList')
    let token = _c.config('token')
    // axios
    //   .post('http://192.168.200.111:8080/system/log/importLog', params, { headers: { token } })
    //   .then(res => {
    //     // status == 200  code==''
    //     if (res.status == 200) {
    //       console.log(
    //         'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    //       )
    //       mainWindow = null
    //       app.quit()
    //     }
    //   })

    // app.quit()
  })
}

function loadingWindow() {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    backgroundColor: '#222',
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true },
  })

  loadWindow.loadURL(loadingURL)

  loadWindow.show()

  setTimeout(() => {
    createMainWindow()
  }, 2000)

  loadWindow.on('closed', () => {
    loadWindow = null
  })
}

function initWindow() {
  if (config.UseStartupChart) {
    return loadingWindow()
  } else {
    return createMainWindow()
  }
}
export default initWindow
