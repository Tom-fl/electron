/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-04-12 15:40:08
 * @LastEditTime: 2022-09-10 22:07:33
 * @Email: Tom
 * @FilePath: \electron-vue-template-master (2)\electron-vue-template-master\src\renderer\network\departmentChild.js
 * @Environment: Win 10
 * @Description:点击哪个部门对应的接口
 */
import http from './http'

export default {
  // 告别按钮
  apiQueryEtiquetteList: params => http.get(`/undertaker/mng/hall/hallEtiquette`, params),
  // 守灵按钮
  apiQueryHallWakeRoomList: params => http.get(`/undertaker/mng/hall/hallWakeRoom`, params),
  // 火化按钮
  apiQueryCrematorList: params => http.get(`/undertaker/mng/hall/crematorList`, params),
  // 整容按钮
  apiQueryCosmeticHallList: params =>
    http.get(`/undertaker/mng/hall/funeralHallCodeCosmeticHallList`, params),
}
