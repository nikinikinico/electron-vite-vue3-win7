import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 50000
  //   headers: { "Content-Type": "application/json;charset=utf-8" },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   config.headers.Authorization = accessToken;
    // }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  //接口正常响应时的数据
  (response: AxiosResponse) => {
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response
    }
    const res = response.data
    if (res.code !== 200 && !response.config?.url?.includes('logout')) {
      ElMessage.error(res.msg || res.data || 'Error')
      return Promise.reject(new Error(res.msg || res.data || 'Error'))
    }
    return res
  },
  //接口报错响应的数据
  (error: any) => {
    ElMessage.error(error.msg || 'Request Error')
    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service
