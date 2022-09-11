<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-10 21:49:34
 * @LastEditTime: 2022-09-11 19:14:21
 * @Email: Tom
 * @FilePath: \electron-vue-template-master1\electron-vue-template-master\src\renderer\layout\index.vue
 * @Environment: Win 10
 * @Description: index
-->
<template>
  <div v-loading="loading" element-loading-text="加载中...">
    <div class="input_box">
      <el-input v-model="numGLength" type="number" clearable placeholder="生成数量" />
      <el-input v-model="numG" placeholder="靓号尾号(可不填)" clearable />
      <div>
        <el-button type="primary" @click="handleClickCreateNumG">创建</el-button>
      </div>
    </div>

    <el-card class="box-card">
      <ul class="list_ul">
        <li v-for="item in numGList">
          <span>
            {{ item.privateKey }}
          </span>
          <span>---</span>
          <span>
            {{ item.base58 }}
          </span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import api from '@/network/login'
import { getLocalStorage } from '@/utils/storage'
const TronWeb = require('tronweb')
const qiaoC = require('qiao-config')

export default {
  name: 'index',
  data() {
    return {
      numG: '',
      numGLength: '',
      numGList: [],
      emptyList: [],
      loading: false,
    }
  },
  methods: {
    createFn() {
      TronWeb.createAccount('').then(res => {
        res.base58 = res.address.base58
        let privateKey = res.address.base58
        if (
          privateKey.slice(privateKey.length - this.numG.length, privateKey.length) == this.numG
        ) {
          this.numGList.push(res)
          if (this.numGList.length === this.emptyList.length) {
            this.loading = false
            this.numGList.map(item => {
              item.address = item.base58
            })
            const _c = qiaoC.c()
            _c.config('dataList', this.numGList)
          }
        }
      })
    },
    handleClickCreateNumG() {
      if (this.numGLength == '') {
        ElMessage({
          type: 'error',
          message: '请填写个数',
          duration: 500,
        })
        return
      }

      this.numGList = []
      this.loading = true
      this.emptyList = Array.apply(null, { length: parseInt(this.numGLength) }).map((_, index) => {
        return {
          val: index,
        }
      })

      setInterval(() => {
        for (let i = this.numGList.length; i < this.emptyList.length; i++) {
          this.createFn()
        }
      })
    },

    // 点击上传
    handleClickImport() {
      this.numGList.map(item => {
        item.address = item.base58
      })
      api.submitImportLog(this.numGList).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style scoped>
.input_box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 30px;
}

.input_box .el-input {
  width: 30%;
}
.list_ul {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  padding-top: 120px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list_ul li {
  display: flex;
}
.box-card {
  overflow: auto;
}
.box-card::-webkit-scrollbar-thumb {
  background-color: #92959b;
  border-radius: 8px;
}
.box-card::-webkit-scrollbar {
  width: 10px;
  height: 13px;
}
</style>
