/**
 * @author GuangHui
 * @description 文件相关类型转换函数
 */

/**
 * dataURL(base64)转Blob
 *
 * @export Blob
 * @param {String} dataurl dataURL字符串
 * @returns Blob
 */
export function dataURL2Blob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * dataURL(base64)转File
 *
 * @export File
 * @param {String} dataurl
 * @param {String} filename
 * @returns File
 */
export function dataURL2File(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * blob、file转 dataURL(base64)
 *
 * @export base64
 * @param {Blob|File} blobOrFile
 * @returns dataURL
 */
export function blob2DataURL(blobOrFile) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(blobOrFile)

    reader.onload = function(e) {
      resolve(reader.result)
    }

    reader.onerror = function(err) {
      reject(err)
    }
  })
}

/**
 * file转Blob
 *
 * @export
 * @param {File} file file对象
 * @returns
 */
export function file2Blob(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = function(e) {
      resolve(new Blob([reader.result], { type: file.type }))
    }

    reader.onerror = function(err) {
      reject(err)
    }
  })
}

/**
 * blob转File
 *
 * @export File
 * @param {Blob} blob blob
 * @param {String} name filename
 * @returns
 */
export function blob2File(blob, name) {
  return new File([blob], name, { type: blob.type })
}

/**
 * blob、file 转ObjectURL
 *
 * @export ObjectURL
 * @param {Blob|File} blobOrFile
 * @returns ObjectURL
 */
export function blob2ObjectURL(blobOrFile) {
  return URL && URL.createObjectURL
    ? URL.createObjectURL(blobOrFile)
    : new Error('blob2ObjectURL转换出错')
}

/**
 * string -> base64
 * btoa从二进制数据“字符串”创建一个base-64编码的ASCII字符串
 * 实现参考
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa#Unicode_%E5%AD%97%E7%AC%A6%E4%B8%B2
 *
 * @export
 * @param {String} s 需要编码的字符串
 * @returns
 */
export function _btoa(s) {
  if (btoa) {
    return btoa(
      // 原生btoa，无法编码中文，需要encodeURIComponent再escape(转移)
      encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1)
      })
    )
  }
}

/**
 * base64 -> string
 * atob能够解码通过base-64编码的字符串数据
 *
 * @export
 * @param {String} s 需要解码的base64字符串
 * @returns
 */
export function _atob(s) {
  if (atob) {
    return decodeURIComponent(
      atob(s)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  }
}
