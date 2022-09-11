<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-10 21:49:34
 * @LastEditTime: 2022-09-10 22:00:38
 * @Email: Tom
 * @FilePath: \electron-vue-template-master (2)\electron-vue-template-master\src\renderer\App.vue
 * @Environment: Win 10
 * @Description: 
-->
<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import CHeader from './components/title'
export default {
  components: { CHeader },
}
</script>

<style>
/* CSS */
</style>
