import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { CaptchaResult, LoginData, LoginResult } from './types'

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/user/logout',
    method: 'delete'
  })
}

/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: '/user/captcha',
    method: 'get'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}
