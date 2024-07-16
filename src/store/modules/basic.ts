import { defineStore } from 'pinia'
import ls from '@/utils/ls'
export const useBasicStore = defineStore('basic', {
  state: () => ({
    lang: ls.get('lang') || 'zh-CN',
    count: 0,
    name: 'home'
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    async add100(): Promise<number> {
      const res = await new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(100)
        }, 2000)
      })
      this.count += res
      return this.count // 返回一个 Promise 对象
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
