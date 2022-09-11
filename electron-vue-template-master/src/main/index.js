/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-10 21:49:34
 * @LastEditTime: 2022-09-11 19:09:00
 * @Email: Tom
 * @FilePath: \electron-vue-template-master1\electron-vue-template-master\src\main\index.js
 * @Environment: Win 10
 * @Description:
 */
'use strict'

import { app } from 'electron'
import initWindow from './services/windowManager'
import DisableButton from './config/DisableButton'
import electronDevtoolsInstaller, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import axios from 'axios'
const qiaoC = require('qiao-config')
const _c = qiaoC.c()

function onAppReady() {
  initWindow()
  DisableButton.Disablef12()
  if (process.env.NODE_ENV === 'development') {
    electronDevtoolsInstaller(VUEJS_DEVTOOLS)
      .then(name => console.log(`installed: ${name}`))
      .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
  }
}
//禁止程序多开，此处需要单例锁的同学打开注释即可
// const gotTheLock = app.requestSingleInstanceLock()
// if(!gotTheLock){
//   app.quit()
// }
app.isReady() ? onAppReady() : app.on('ready', onAppReady)
// 解决9.x跨域异常问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('window-all-closed', () => {
  // 所有平台均为所有窗口关闭就退出软件
  console.log('window-closeeeee')
  const params = _c.config('dataList')
  const token = _c.config('token')
  const baseURL = _c.config('baseURL')

  axios.post(`${baseURL}/system/log/importLog`, params, { headers: { token } }).then(res => {
    // status == 200  code==''
    if (res.status == 200) {
      _c.config('dataList', [])
      console.log('xxxxxxx-------------------------------------------------xxxx')
      console.log(_c.config('dataList'))
      // app.quit()
    }
  })

  // app.quit()
})

app.on('browser-window-created', () => {
  console.log('window-created')
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-vue-template')
    console.log('有于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('electron-vue-template')
}
