/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
}

/**
 * 登录响应
 */
export interface LoginResult {
  /**
   * 访问token
   */
  accessToken?: string
}

/**
 * 验证码响应
 */
export interface CaptchaResult {
  /**
   * 验证码缓存key
   */
  captchaKey: string
  /**
   * 验证码图片Base64字符串
   */
  captchaBase64: string
}

/**
 * 用户信息
 */
