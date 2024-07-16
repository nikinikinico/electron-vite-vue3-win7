<script setup lang="ts">
import { useBasicStore } from '@/store'
import { loginApi, getUserInfo } from '@/api/user'
import { useI18n } from 'vue-i18n'
import ls from '@/utils/ls'
const router = useRouter()
const i18n = useI18n()
const basic = useBasicStore()
const handleCommand = (command: string) => {
  i18n.locale.value = command
  ls.set('lang', command)
  basic.lang = command
}
const language = computed(() => i18n.locale.value)
// 点击事件跳转对应页面
function goTo(path: string) {
  router.push(path)
}
const loginBtn = () => {
  loginApi({ username: 'a1dmin', password: 'admin' }).then((res) => {
    console.log(res)
  })
}
const userInfoBtn = () => {
  getUserInfo().then((res) => {
    console.log(res, '用户信息')
  })
}
const count = ref(0)
</script>

<template>
  <SvgIcon name="renwen" :size="15" style="color: pink"></SvgIcon>
  <SvgIcon name="room"></SvgIcon>

  <el-icon size="25" color="red">
    <i-ep-edit />
  </el-icon>
  <el-button @click="goTo('/about')">去到about页面</el-button>
  <el-button @click="goTo('/config')">去到配置页面</el-button>
  <el-button @click="loginBtn">登录</el-button>
  <el-button @click="userInfoBtn">用户信息</el-button>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  <div>
    <p>{{ $t('hello', { msg: 'wjy' }) }}</p>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        切换语言
        <el-icon class="el-icon--right">
          <i-ep-arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN" :disabled="language === 'zh-CN'"
            >中文</el-dropdown-item
          >
          <el-dropdown-item command="en-US" :disabled="language === 'en-US'"
            >English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
$color: #ccc;

.read-the-docs {
  color: $color;
}
</style>
