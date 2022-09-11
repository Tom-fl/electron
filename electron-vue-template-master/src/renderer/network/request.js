/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2021-09-07 16:15:47
 * @LastEditTime: 2022-09-10 22:28:18
 * @Email: str-liang@outlook.com
 * @FilePath: \electron-vue-template-master (2)\electron-vue-template-master\src\renderer\network\request.js
 * @Environment: Win 10 Python 3.8
 * @Description:
 */
import https from 'https'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'
import qs from 'qs'
import { Message } from 'element-ui'
import { getLocalStorage, removeLocalStorage } from '@/utils/storage'
import isPlainObject from 'lodash/isPlainObject'
const baseURL = process.env.BASE_API

const http = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 180,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

/**
 * 请求拦截
 */

http.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = Cookies.get('language') || 'zh-CN'
    config.headers['token'] = getLocalStorage('token')
    // 默认参数
    var defaults = {}
    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() },
      }
    }
    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params,
      }
    }
    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data,
      }
      if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    if (response.data.code === 401 || response.data.code === 10001) {
      removeLocalStorage('token')
      router.replace({ name: 'login' })
      return Promise.reject(response.data)
    } else if (response.data.code === 0) {
    } else {
      return Promise.resolve(response.data)
    }
    return response
  },
  error => {
    if (JSON.stringify(error).indexOf('tatus code 404') !== -1) {
      Message.error('接口未找到')
      return Promise.reject(error)
      return
    }
    Message.error('网络异常')
    return Promise.reject(error)
  }
)

export default http
