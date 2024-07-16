/// <reference types="vite/client" />
/**
 * 配置环境变量的声明，方便使用vite的环境变量时得到代码提示
 * 对应.env或.env.x文件中定义的属性名，注意vite要求自定义属性的前缀必须为VITE_xxxx
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string // app标题
  readonly VITE_BASE_URL: string // 基础请求
}
