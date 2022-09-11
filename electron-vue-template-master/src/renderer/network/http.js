/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2021-08-30 12:18:03
 * @LastEditTime: 2022-03-11 12:35:58
 * @Email: str-liang@outlook.com
 * @FilePath: \bz-project\src\network\http.js
 * @Environment: Win 10 Python 3.8
 * @Description:
 */
import request from "./request";

const http = {
  get(url, params) {
    const config = {
      method: "get",
      url: url
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },
  post(url, data) {
    const config = {
      method: "post",
      url: url
    };
    if (data) config.data = data;
    return request(config);
  },
  postForm(url, data) {
    const config = {
      method: "post",
      url: url,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    };
    if (data) config.data = data;
    return request(config);
  },
  put(url, params) {
    const config = {
      method: "put",
      url: url
    };
    if (params) config.data = params;
    return request(config);
  },
  putSplice(url, params) {
    const config = {
      method: "put",
      url: url
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },
  // 请求 拼接
  delete(url, params) {
    const config = {
      method: "delete",
      url: url
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },
  // 请求 在body里
  deleteBody(url, data) {
    const config = {
      method: "delete",
      url: url
    };
    if (data) config.data = data;
    return request(config);
  },
  // base64转文件 上传
  requestFile(url, file) {
    const forms = new FormData();
    forms.append("file", file);
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    if (file) config.data = forms;
    return request(config);
  }
};

export default http;
