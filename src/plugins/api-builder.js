/**
 * @author GuangHui
 * @description api构造器
 */

import { stringify } from 'qs'

import { API_DEFAULT_CONFIG } from 'Config'

import axios from 'Plugins/axios-instance'

import { assert } from 'Utils'
import { isEmpty } from 'Utils/type-judge'

import API_MAP from 'Services/api'

class ApiBuilder {
  constructor(options) {
    // console.log('options', options)
    this.api = {}
    this.makeApi(options)
  }

  makeApi({
    apiMap = {},
    sep = '/',
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    Object.keys(apiMap).forEach(namespace => {
      this._makeSingleApi({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: apiMap[namespace]
      })
    })
  }

  _makeSingleApi({ namespace, mock, mockBaseURL, sep, debug, config }) {
    config.forEach(api => {
      const { name, desc, params, method, mockEnable, path, mockPath } = api

      // 生产环境关闭mock，非生产环境根据全局配置的mock字段和接口mock字段mockEnable来决定是否为当前接口启用mock
      const isMock =
        process.env.NODE_ENV === 'production' ? false : mock || mockEnable

      const url = isMock ? mockPath : path
      const baseURL = isMock && mockBaseURL

      debug && assert(name, `${url} :接口name属性不能为空`)
      debug &&
        assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
        value(outerParams, outerOptions) {
          // console.log('outerParams, outerOptions', outerParams, outerOptions)

          // 若外部参数为空，则使用内部默认参数，否则，合并内外部参数传递(这样可能会出现生产环境误传了默认值，所以改用非mock环境直接使用外部传入参数)
          // const _data = isEmpty(outerParams)
          //   ? params
          //   : pick(Object.assign({}, params, outerParams), Object.keys(params))

          // 非mock环境下直接使用外部传入参数
          const _data = isMock ? params : outerParams

          // 非生产环境提示接口入参为空
          process.env.NODE_ENV !== 'production' &&
            assert(
              !isEmpty(_data),
              `注意接口【${name}】入参为空!请注意排查，是否漏传`
            )

          const _options = isMock
            ? { url, desc, method: method.toLowerCase(), baseURL }
            : { url, desc, method: method.toLowerCase() }

          const normalizedOptions = _normalize(
            Object.assign(_options, outerOptions),
            _data
          )

          return axios(normalizedOptions)
        }
      })
    })
  }
}

function _normalize(options, data) {
  if (options.method.toLowerCase() === 'post') {
    options.data = stringify(data)
  } else if (options.method.toLowerCase() === 'get') {
    options.params = data
  }
  return options
}

export default new ApiBuilder({
  ...API_DEFAULT_CONFIG,
  apiMap: API_MAP
}).api
