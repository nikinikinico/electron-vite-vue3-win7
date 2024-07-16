<script setup lang="ts">
const router = useRouter()
console.log('dev独有的环境变量：' + import.meta.env.VITE_BASE_URL)
initListen()
function initListen() {
  window.ipcRenderer.on('openConfig', () => {
    console.log('打开配置页')
    router.push('/config')
  })
}
onMounted(() => {
  window.ipcRenderer.invoke('check-update')
  window.ipcRenderer.on('download-progress', downloadProgressHandle)
})
// 版本更新，处理下载进度回调
function downloadProgressHandle(_e: any, data: any) {
  console.log(data)
}

onUnmounted(() => {
  window.ipcRenderer.removeListener('download-progress', downloadProgressHandle)
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
