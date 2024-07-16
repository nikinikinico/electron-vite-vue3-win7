import debug from './env'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup()
}

export const successResponseWrap = (data: unknown) => {
  //主要是code和data {code:200,data:[]}
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: 200
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 500) => {
  return {
    data,
    status: 'fail',
    msg,
    code
  }
}
