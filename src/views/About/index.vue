<template>
  <div>这是一个测试页面</div>
  <div>{{ basic.count }}</div>
  <el-button @click="add100Fn">延迟添加100</el-button>
  <el-button @click="openDev">测试打开devTools</el-button>
  <GoBack></GoBack>
</template>
<script setup lang="ts">
import { useBasicStore } from '@/store'
const basic = useBasicStore()
const add100Fn = async () => {
  const res = await basic.add100()
  console.log(res, '增加的值')
}
const openDev = async () => {
  window.ipcRenderer.send('openDevtools')
}
</script>
