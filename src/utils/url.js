/**
 * @author GuangHui
 * @description URL相关
 */

/**
 * 解析查询字符串
 * @param {String} qs 需要解析的查询字符串
 * @return {Object} 解析后的对象
 * http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled
 * 解析后:
 * {
  user: 'anonymous',
  id: [123, 456],     // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京',        // 中文
  enabled: true,      // 未指定值的 key 约定值为 true
  d:true
}
 */
export function getQueryObject(qs = location.search) {
  if (!qs || typeof qs !== 'string') return {}

  qs = decodeURIComponent(qs.substring(qs.lastIndexOf('?')))

  const re = /([^?&=]+)(=([^&?=]+))?/g

  const obj = {}

  for (let result = re.exec(qs); result != null; result = re.exec(qs)) {
    let { 1: key, 3: value } = result

    if (value == null) {
      obj[key] = true
      continue
    }

    if (!isNaN(Number(value))) value = Number(value)

    const target = obj[key]
    if (target) {
      if (Array.isArray(target)) {
        target.push(value)
      } else {
        obj[key] = [target, value]
      }
    } else {
      obj[key] = value
    }
  }

  return obj
}

/**
 * 从URL中解析出protocol、host
 *
 * @export
 * @param {string} url 待解析的URL
 * @returns {URLOrigin} 解析出的protocol、host对象
 */
export function resolveURL(url) {
  let urlParsingNode = document.createElement('a')
  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode

  urlParsingNode = null

  return { protocol, host }
}

/**
 * 判断是否同源URL
 *
 * @export
 * @param {*} requestURL 请求URL
 * @param {*} [requestURL2=window.location.href] 需要对应请求URL2，默认当前域
 * @returns
 */
export function isURLSameOrigin(
  requestURL,
  requestURL2 = window.location.href
) {
  if (typeof requestURL !== 'string' || typeof requestURL2 !== 'string') {
    throw new Error('请输入正确的URL')
  }

  const { protocol, host } = resolveURL(requestURL)
  const { protocol: curProtocol, host: curHost } = resolveURL(requestURL2)

  return protocol === curProtocol && host === curHost
}

/**
 * 判断是否绝对路径
 *
 * @export
 * @param {string} url 待判断url
 * @returns {boolean} 是否绝对路径
 */
export function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

/**
 * 拼接URL
 *
 * @export
 * @param {string} baseURL 基础URL
 * @param {string} [relativeURL] 相对URL
 * @returns {string} 完整URL
 */
export function combineURL(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}
