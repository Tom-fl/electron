/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-10 22:23:29
 * @LastEditTime: 2022-09-10 22:23:48
 * @Email: Tom
 * @FilePath: \electron-vue-template-master (2)\electron-vue-template-master\src\renderer\utils\storage.js
 * @Environment: Win 10
 * @Description:
 */
/*
 * 设置setLocalStorage
 * */
export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getLocalStorage
 * */
export function getLocalStorage(key) {
  if (window.localStorage.getItem(key) == null) {
    return undefined
  } else {
    return window.JSON.parse(window.localStorage.getItem(key) || '')
  }
}
/*
 * 设置setSessionStorage
 * */
export function setSessionStorage(key, value) {
  window.sessionStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getSessionStorage
 * */
export function getSessionStorage(key) {
  return window.JSON.parse(window.sessionStorage.getItem(key) || '')
}

export function removeSessionStorage(key) {
  window.sessionStorage.removeItem(key)
}

export function removeAllSessionStorage() {
  window.sessionStorage.clear()
}

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key)
}

export function removeAllLocalStorage() {
  window.localStorage.clear()
}

export default {
  setLocalStorage,
  getLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  removeAllSessionStorage,
  removeLocalStorage,
  removeAllLocalStorage,
}
