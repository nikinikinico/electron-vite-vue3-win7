// src\router\index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //  hash 模式。
  history: createWebHashHistory(),
  routes: [
    // 设置首页
    {
      path: '/',
      component: () => import('@/views/Home/index.vue')
    },
    // 配置helloworld页的路径
    {
      path: '/about',
      component: () => import('@/views/About/index.vue')
    },
    {
      path: '/config',
      component: () => import('@/components/CommonConfig.vue')
    }
  ]
})

export default router
