/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-04-11 18:00:12
 * @LastEditTime: 2022-09-10 22:07:39
 * @Email: 1399936889@qq.com
 * @FilePath: \electron-vue-template-master (2)\electron-vue-template-master\src\renderer\network\login.js
 * @Environment: Win 10
 * @Description:
 */

import http from './http'

export default {
  /**
   * @description: 登录
   */
  // 获取验证码
  queryLoginCaptchaImage: params => http.get(`/captchaImage`, params),
  // 登录
  queryLoginBySecret: params => http.post(`/loginBySecret`, params),
  // 上传
  submitImportLog: params => http.post(`/system/log/importLog`, params),
}
