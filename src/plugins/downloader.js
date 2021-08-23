/**
 * @author GuangHui
 * @description 前端下载
 */

import { isIE } from 'Utils/browser'

export class Downloader {
  constructor() {
    this._isIE = isIE

    this._downloader = this._isIE ? this._ieDownload : this._download
  }

  download(files) {
    if (this._isArray(files)) {
      files.forEach(file => this._downloader(file, this._getFileName(file)))
    } else if (typeof files === 'string') {
      this._downloader(files, this._getFileName(files))
    } else {
      for (const file in files) {
        this._downloader(files[file], file)
      }
    }
  }

  /**
   * 适用于现代浏览器的下载方式(支持download属性的浏览器)
   * @param {String | FileObj} contetOrPath base64、blob、下载路径
   * @param {String} fileName 文件保存名
   */
  _download(contetOrPath, fileName) {
    if (!contetOrPath || !fileName) throw new Error('参数错误')

    const link = document.createElement('a')

    // 如果是dataURL或者下载路径，则直接下载
    // 否则使用blob转换
    const href =
      this._isDataUrl(contetOrPath) || this._isPath(contetOrPath)
        ? contetOrPath
        : URL.createObjectURL(new Blob([contetOrPath]))

    // 设置保存名称及路径
    link.download = fileName
    link.href = href

    // 创建事件并触发下载
    const eve = new MouseEvent('click')
    link.dispatchEvent(eve)
  }

  /**
   * 适用于ie的下载方式
   * @param {String | FileObj} contetOrPath base64、blob、下载路径
   * @param {String} fileName 文件保存名
   */
  _ieDownload(contetOrPath, fileName) {
    const frame = document.createElement('iframe')
    frame.style.display = 'none'
    frame.src = contetOrPath

    document.body.appendChild(frame)

    // 图片dataurl，则将文件写入到iframe中再保存
    this._isImgDataUrl(contetOrPath) &&
      frame.contentWindow.document.write(`<img src="${contetOrPath}" />`)

    frame.onload = function() {
      // 在下一个事件循环中，执行ie自带指令保存
      // 防止循环时，多次同步调用产生bug
      setTimeout(() => {
        frame.contentWindow.document.execCommand('SaveAs', false, fileName)
      }, 20)
      document.body.removeChild(frame)
    }
  }

  /**
   * 是否是DataUrl
   * @param {String} str str
   */
  _isDataUrl(str) {
    return typeof str === 'string' && /^data:/.test(str)
  }

  /**
   * 是否是文件路径
   * @param {String} str 文件路径
   */
  _isPath(str) {
    return typeof str === 'string' && str.lastIndexOf('.') > -1
  }

  /**
   * 是否图片dataurl
   * @param {String} str str
   */
  _isImgDataUrl(str) {
    return typeof str === 'string' && /^data:image/.test(str)
  }

  /**
   * 判断是否数组
   * @param {Array} arr 数组
   */
  _isArray(arr) {
    return Array.isArray
      ? Array.isArray(arr)
      : Object.prototype.toString.call(arr) === '[object Array]'
  }

  /**
   * 从url中推断出文件名
   * @param {String} url url
   */
  _getFileName(url) {
    return url.lastIndexOf('/') > -1 ? url.slice(url.lastIndexOf('/') + 1) : url
  }
}

 
