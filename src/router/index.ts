// src\router\index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //  hash 模式。
  history: createWebHashHistory(),
  routes: [
    // 设置首页
    {
      path: '/',
      component: () => import('@/demo/HelloWorld.vue')
    },
    // 配置helloworld页的路径
    { 
      path: '/about', 
      component: () => import('@/demo/About.vue') 
    },
    {
      path:'/config',
      component:()=> import('@/components/CommonConfig.vue')
    }
  ],
})

export default router
