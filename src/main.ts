import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import i18n from './locale'
// src\main.ts
import 'virtual:svg-icons-register'
import router from './router'
import 'element-plus/theme-chalk/el-message.css'
import './mock'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
