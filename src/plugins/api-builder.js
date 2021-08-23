/**
 * @author GuangHui
 * @description api构造器
 */

/**
 * 标准化参数
 *
 * @date 2021-08-11 11:18:32
 * @private
 * @param {Object} options axios配置对象
 * @param {Object} _data data数据
 * @return {Object} 修改后的axios配置对象
 */
 export function _normalize(options, _data) {
  if (options.method.toLowerCase() === 'post') {
    options.data = _data
  } else if (options.method.toLowerCase() === 'get') {
    options.params = _data
  }
  return options
}

/**
 * Api构造器
 *
 * @date 2021-08-10 23:26:46
 * @export
 * @class ApiBuilder
 */
export class ApiBuilder {
  /**
   * Creates an instance of ApiBuilder.
   *
   * @date 2021-08-10 23:27:01
   * @example
  const apiBuilder = new ApiBuilder({
    axiosInstance, // axios实例
    globalMockEnable = false, // 是否开启全局mock
    debug = false, // 调试模式
    mockBaseURL = '', // mock时的baseURL；支持传入一个字符串，也可以传入一个方法返回一个字符串，此方法会接收到当前请求配置对象，方便根据请求对象，灵活配置mockBaseURL
    onBeforeSendData = val => val,// 发送data前回调（全局级）；会接受到data，可在此时修改data，此方法的返回值将做为data发送
  })
   * @memberof ApiBuilder
   */
  constructor({
    axiosInstance, // axios实例
    globalMockEnable = false, // 是否开启全局mock
    debug = false, // 调试模式
    mockBaseURL = '', // mock时的baseURL；支持传入一个字符串，也可以传入一个方法返回一个字符串，此方法会接收到当前请求配置对象，方便根据请求对象，灵活配置mockBaseURL
    onBeforeSendData = val => val // 发送data前回调（全局级）；会接受到data，可在此时修改data，此方法的返回值将做为data发送
  } = {}) {
    if (!axiosInstance) throw new Error('axiosInstance is required')

    this.nameSet = new Set()

    this.axiosInstance = axiosInstance
    this.globalMockEnable = globalMockEnable
    this.debug = debug
    this.mockBaseURL = mockBaseURL

    this.onBeforeSendDataGlobal = onBeforeSendData
  }

  /**
   * 创建api
   *
   * @date 2021-08-10 23:28:51
   * @public
   * @instance
   * @example
   const getPermission = apiBuilder.create({
      name: 'getPermission', // 【必填】接口调用名
      method: 'post', // 请求类型
      desc: '权限查询', // 【必填】接口的描述
      path: '/hw/common/permission/query', // 【必填】接口路径
      mockPath: '/api/mock', // 【非必填】接口的mock地址
      mockEnable: false, // 是否单独启用mock
      onBeforeSendData: val => val,// 配置级的发送data前回调，会接受到data，可在此时修改data，此方法的返回值将做为data发送；优先级高于onBeforeSendDataGlobal
   })

   getPermission({id:'xxx'}).then(console.log)

   // 或者传入额外的参数

   getPermission(
     {id:'xxx'},// 数据
     { // 额外的axios Request Config，https://github.com/axios/axios#request-config；最终发送的是create参数和额外参数的合并，后者覆盖前者
     headers: {
       'X-Requested-With': 'XMLHttpRequest'
     },
     onUploadProgress
   }).then(console.log)
   * @return {Function} 返回一个调用axiosInstance的方法
   * @memberof ApiBuilder
   */
  create({
    name, // 【必填】接口调用名
    desc, // 【必填】接口的描述
    method, // 请求类型
    mockEnable, // 是否单独启用mock
    path, // 【必填】接口路径
    mockPath, // 【非必填】接口的mock地址
    onBeforeSendData// 配置级的发送data前回调，会接受到data，可在此时修改data，此方法的返回值将做为data发送；优先级高于onBeforeSendDataGlobal
  } = {}) {
    if (!name) throw new Error('api定义的name字段是必填项！')

    if (this.nameSet.has(name)) throw new Error(`💥${name} :接口名称重复，请排查！`)
    this.nameSet.add(name)

    let isMock = false
    try {
      // 生产环境关闭mock，非生产环境根据全局配置的mock字段和接口mock字段mockEnable来决定是否为当前接口启用mock
      isMock = process.env.NODE_ENV === 'production'
        ? false
        : this.globalMockEnable || mockEnable
    } catch (error) {}

    // 发送前回调
    const _onBeforeSendData = onBeforeSendData || this.onBeforeSendDataGlobal

    const url = isMock ? mockPath : path
    const baseURL = isMock
      ? (
          typeof this.mockBaseURL === 'function'
            ? this.mockBaseURL({
              name,
              desc,
              method,
              mockEnable,
              path,
              mockPath,
              onBeforeSendData: _onBeforeSendData
            })
            : this.mockBaseURL
        )
      : '' // 非mock时，不会用到此参数，所以置空

    this.debug && console.log('url', url)
    this.debug && console.log('baseURL', baseURL)

    // mock环境，则覆盖axiosInstance的baseURL
    const _options = isMock
      ? { url, desc, method: method.toLowerCase(), baseURL }
      : { url, desc, method: method.toLowerCase() }

    this.debug && console.log('_options:', _options)
    
    // 可在实际调用时传入额外参数_opt，最终会被合并到axios的config中，可以在拦截器中拿到
    // 可利用此特性实现请求的自定义错误处理逻辑，比如：请求时单独配置一个_noShowDefaultError: true字段，将错误抛出，由业务自行处理而不是拦截器中统一处理
    // 也可实现改变headers、添加onUploadProgress回调等能力
    return /* _request */(_data, _opt = {}) => {
      this.debug && console.log('_data:', _data)
      this.debug && console.log('_opt:', _opt)
      const normalizedOptions = _normalize(
        Object.assign({}, _options, _opt),
        _onBeforeSendData(_data)
      )

      this.debug && console.log('normalizedOptions:', normalizedOptions)

      return this.axiosInstance(
        normalizedOptions
      )
    }
  }
}
