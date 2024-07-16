import Mock from 'mockjs'
import setupMock, {
  successResponseWrap,
  failResponseWrap
} from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'
setupMock({
  mock: true,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      console.log(params.body, 'body')
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 400)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 400)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 40021)
    })

    //用占位符形式来返回
    Mock.mock(new RegExp('/api/user/info'), {
      code: 200,
      'data|1-10': [
        {
          'id|+1': 1
        }
      ]
    })
  }
})
