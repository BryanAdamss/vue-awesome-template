/**
 * @author GuangHui
 * @description openapi-typescript-fetch 实例
 * @docs https://github.com/ajaishankar/openapi-typescript-fetch
 */

import type { Middleware } from 'openapi-typescript-fetch'

import { Fetcher } from 'openapi-typescript-fetch'

import type { paths } from '@/services/api/swagger-api'

const interceptor: Middleware = async (url, init, next) => {
  console.log('🚦 -> file: otfetch-instance.ts -> line 15 -> constinterceptor:Middleware= -> url, init', url, init)

  /* before send req */
  /* 添加token */
  init.headers.append('Authorization', 'testtoken')

  const response = await next(url, init)

  /* after send req */
  /* 可在此处处理response通用逻辑 */
  console.log('🚦 -> file: otfetch-instance.ts -> line 18 -> constinterceptor:Middleware= -> response', response)

  return response
}

export const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: import.meta.env.VITE_HTTP_OPENAPI_TS_FETCH_BASE_URL,
  init: {
    headers: {
      accept: 'application/json',
    },
  },
  use: [interceptor],
})
