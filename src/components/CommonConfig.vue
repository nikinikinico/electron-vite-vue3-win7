<template>
  <div class="config">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="server" name="server">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item label="服务器地址">
            <el-input v-model="form.baseUrl"></el-input>
          </el-form-item>
          <el-form-item label="mqtt地址">
            <el-input v-model="form.mqttUrl"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="custom" name="custom">custom</el-tab-pane>
    </el-tabs>
    <el-button @click="saveStore">保存</el-button>
    <GoBack></GoBack>
  </div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
const activeName = ref('server')
const form = reactive({ baseUrl: '', mqttUrl: '' })
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
/**获取服务器地址配置 */
async function getConfig() {
  const res: any = await ipcRenderer.invoke('getStore', 'serverConfig')
  if (res) {
    form.baseUrl = res?.baseUrl
    form.mqttUrl = res?.mqttUrl
  }
}
getConfig()

/**存储服务器地址配置 */
function saveStore() {
  try {
    ipcRenderer.send('setStore', 'serverConfig', {
      baseUrl: form.baseUrl,
      mqttUrl: form.mqttUrl
    })
    ElMessage.success('已存储系统配置')
  } catch (error) {
    ElMessage.error('获取系统配置失败')
  }
}
</script>
<style lang="scss">
.config {
  width: 100%;
  height: 100%;
}
</style>
