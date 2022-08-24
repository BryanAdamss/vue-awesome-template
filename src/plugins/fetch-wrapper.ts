/**
 * @author GuangHui
 * @description fetch封装
 */

type HttpMethods = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'

/* 自定义参数 */
export interface CustomOpts {
  singleton: boolean
  baseUrl: string
  onBeforeSendReq: (opts: Opts) => Opts
  onSendReqError: (err: unknown) => any
  onReciveRespSucc(resp: any): any
  onReciveRespSucc<Ret>(resp: Promise<Ret>): any
  onReciveRespError: (err: unknown) => any
  transformData: (data: unknown) => BodyInit | null | undefined
}

/* 完整参数 */
type Opts = CustomOpts & RequestInit

/* 默认参数 */
const defaultOpts: CustomOpts = {
  singleton: false,
  baseUrl: '',
  onBeforeSendReq: opts => opts, /* 默认拦截器原样返回 */
  onSendReqError: err => err,
  onReciveRespSucc: (resp: any) => resp, /* 默认拦截器原样返回 */
  onReciveRespError: err => err,
  transformData: data => JSON.stringify(data), /* 默认使用JSON序列化 */
}

export class FetchWrapper {
  static _instance?: FetchWrapper
  globalOpts: Opts

  constructor(opts: Partial<Opts> = {}) {
    this.globalOpts = Object.assign({}, defaultOpts, opts)

    return this.globalOpts.singleton && FetchWrapper._instance
      ? FetchWrapper._instance
      : (FetchWrapper._instance = this)
  }

  /**
   * 判断http状态码是否正确
   *
   * @date 2022-08-15 20:40:21
   * @param {number} code http状态码
   * @return {*}  {boolean} true正确，false错误
   * @memberof FetchWrapper
   */
  isHttpStatusOK(code: number) {
    return code >= 200 && code < 300
  }

  /**
   * 获取headers中的content-type
   *
   * @date 2022-08-15 20:37:53
   * @param {HeadersInit} headers headers
   * @return {*}  string | null
   * @memberof FetchWrapper
   */
  getHeadersInitContentType(headers: HeadersInit) {
    if (headers instanceof Headers) {
      return headers.get('Content-Type')
    }
    else if (Array.isArray(headers)) {
      /* [['Content-Type','application/json'],[xxx,xxx]] */
      if (headers.length === 0)
        return null

      const flattenHeaders = headers.flat()
      const index = flattenHeaders.findIndex(item => item.toLowerCase() === 'content-type')
      return index === -1 ? '' : flattenHeaders[index + 1]
    }
    else {
      return headers['Content-Type'] || null
    }
  }

  /**
   * 创建请求实例
   *
   * @date 2022-08-23 14:24:08
   * @param {HttpMethods} [method='GET']
   * @return {*}  <Param, Ret>(url: string, data?: Param | undefined, init?: Partial<Opts>) => Promise<Ret>
   * @memberof FetchWrapper
   */
  create(method: HttpMethods = 'GET') {
    return async <Param, Ret>(url: string, data?: Param, init?: Partial<Opts>): Promise<Ret> => {
      /* 此处可在某个请求发送时， 改变对应参数配置 */
      /* opts覆盖优先级，单个请求init > this.globalOpts > defaultOpts，前者覆盖后者 */
      let finalOpts = Object.assign({}, this.globalOpts, init)
      let finalUrl = url

      try {
        /* 可在此时对最终的opts做调整 */
        /* onBeforeSendReq调用顺序，先调用全局拦截器处理opts，再调用单个请求拦截器处理全局拦截器返回的opts，顺序修改opts以得到最终opts */
        const onBeforeSendReqQueue = [this.globalOpts.onBeforeSendReq, init?.onBeforeSendReq]
        finalOpts = onBeforeSendReqQueue.reduce((acc, cur) => cur ? cur(acc) : acc, finalOpts)

        const m = init?.method ?? method
        /* 修改method */
        finalOpts.method = m
        /* 转换data */
        if (m === 'GET') {
          const query = data
            ? Object.entries(data)
              .reduce((acc, [k, v]) => acc.concat(`${k}=${v}`), [] as string[])
              .join('&')
            : ''

          finalUrl = query ? `${finalOpts.baseUrl}${url}?${query}` : `${finalOpts.baseUrl}${url}`
          finalOpts.body = null
        }
        else {
          finalOpts.body = finalOpts.transformData(data)
        }
      }
      catch (error) {
        return finalOpts.onSendReqError(error)
      }

      let resp = null
      try {
        resp = await fetch(finalUrl, finalOpts)

        if (!this.isHttpStatusOK(resp.status))
          throw new Error(`HttpStatusError cause by ${resp.status}`)
      }
      catch (error) {
        return finalOpts.onReciveRespError(error)
      }

      const contentType = this.getHeadersInitContentType(finalOpts.headers ?? {})

      /* 如果json类型，自动转化，其余类型需手动处理 */
      if (contentType?.includes('application/json'))
        return finalOpts.onReciveRespSucc<JSON>(resp.json())
      else
        return finalOpts.onReciveRespSucc(resp)
    }
  }
}
