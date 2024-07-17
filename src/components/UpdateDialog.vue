<template>
  <div class="update-page">
    <el-dialog
      v-model="visible"
      width="30%"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :close-on-click-modal="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header" style="margin-top: -5px">
          <span :id="titleId" :class="titleClass" style="font-size: 16px"
            >更新提示</span
          >
        </div>
      </template>
      <div class="confirm" v-if="status === 'confirm'">
        检测到新版本，是否更新?
      </div>
      <div class="processing" v-if="status === 'processing'">
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="progress"
        ></el-progress>
      </div>
      <div class="error" v-if="status === 'error'">更新失败!</div>
      <template #footer>
        <span v-if="status === 'confirm'">
          <el-button @click="CancelUpdate">取消</el-button>
          <el-button type="primary" @click="SureUpdate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
type Status = 'confirm' | 'processing' | 'success' | 'error'
const progress = ref<number>(0)
const visible = ref(false)
const status = ref<Status>('confirm')
onMounted(() => {
  //检查更新
  window.ipcRenderer.send('check-update')
  console.log('check')
  window.ipcRenderer.on('update-available', () => {
    // 有更新
    status.value = 'confirm'
    visible.value = true
  })
  window.ipcRenderer.on('download-progress', (_event: any, msg: any) => {
    // 下载更新进度
    status.value = 'processing'
    progress.value = Math.ceil(msg.percent)
  })
  window.ipcRenderer.on('update-downloaded', () => {
    // 更新下载完成
    progress.value = 0
    visible.value = false
    console.log('下载完成')
  })
  window.ipcRenderer.on('update-error', () => {
    // 更新失败
    status.value = 'error'
    progress.value = 0
    setTimeout(() => {
      visible.value = false
    }, 1000)
  })
})
// 确定更新
const SureUpdate = () => {
  window.ipcRenderer.send('update-app')
  status.value = 'processing'
}
// 取消更新
const CancelUpdate = () => {
  visible.value = false
}
</script>
