/**
 * 浮点数转中文
 *
 * @author:GuangHui
 * @email:adamssbryan@foxmail.com
 * @export
 * @class NumToChn
 */
export default class NumToChn {
  // - 90989002.0384
  // 符号 整数 点号 小数
  // 符号、点号、小数部分直接查找引射表进行翻译即可

  // 整数部分每个计数数字都跟着一个权位，权位有：''(个位，默认不翻译),十、百、千、万、亿。
  // 整数部分以“万”为小节(整数部分从右至左数每四位为一小节)，对应一个节权位，万以下没有节权位(最小节权位为万)，节权位有：万, 亿, 万亿, 亿亿；例:1 2345 . 3；1属于首小节， 2345为第二小节
  // 每个小节内部以“十百千”为权位独立计数。
  // “十百千”不能连续出现，而“万”和“亿”作为节权位时可以和其他权位连用，如：“二十亿”。
  // 整数小节内“零”的使用要满足以下规则：
  // 0对应的权位不翻译。例：203应翻译为'二百 零 三'而不是'二百 零十 三'
  // 小节的末位是0，可不翻译。例：小节为230，逐位翻译，应为'二百 三十 零'，根据此规则，结尾零应该舍弃，为'二百 三十'
  // 小节内两个非0数字之间若出现0要使用“零”。例：小节为203，应翻译为'二百 零 三'
  // 小节内多个连续的零应合并。例：小节为2003，应翻译为二千零三，而非二千零百零十三
  // 当小节的“千”位是0时（即：1~999），只要不是首小节，都要前补“零”。非首小节不足四位时，需要前补零，首小节无需前补零。例: 10234，首小节为1，第二小节为234不足四位，翻译时第二小节需要前补零，即零二百三十四，再prepend第一小节的翻译一万，最终结果为'一万 零 二百 三十 四'
  // 正负0不做区分
  constructor({
    unitChars,
    sectionUnitChars,
    numChars,
    dotChar,
    signChar
  } = {}) {
    this.unitChars = unitChars || ['', '十', '百', '千'] // 节内权位
    this.sectionUnitChars = sectionUnitChars || ['', '万', '亿', '万亿', '亿亿'] // 节权位
    this.numChars = numChars || [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九'
    ] // 数字映射表
    this.dotChar = dotChar || '点'
    this.signChar = signChar || '负'
  }

  /**
   * 判断数字是否在安全范围内
   * @param {Number} n 数字
   */
  isSafeNumber(n) {
    return typeof n === 'number' && !isNaN(n) && Math.abs(n) <= Math.pow(2, 53)
  }

  /**
   * 填充字符串
   *
   * @param {String} str 原始字符串
   * @param {Number} padNum 填充数量
   * @param {String} padChar 填充字符
   * @param {Boolean} [before=true] 前填充
   * @returns 填充后的字符串
   * @memberof NumToChn
   */
  padStr(str, padNum, padChar, before = true) {
    if (
      typeof str !== 'string' ||
      typeof padNum !== 'number' ||
      isNaN(padNum) ||
      padNum === 0 ||
      typeof padChar !== 'string'
    ) {
      return str
    }

    while (padNum) {
      if (before) {
        str = padChar + str
      } else {
        str += padChar
      }
      padNum--
    }

    return str
  }

  /**
   * 获取数字对应中文
   *
   * @param {Number} i 数字
   * @returns 对应数字的中文
   * @memberof NumToChn
   */
  getNumChar(i) {
    return this.numChars[i]
  }

  /**
   * 获取节内权位
   * @param {Number} i 索引
   */
  getUnitChar(i) {
    return this.unitChars[i]
  }

  /**
   * 获取节权位
   * @param {Number} i 索引
   */
  getSectionUnitChar(i) {
    return this.sectionUnitChars[i]
  }

  /**
   * 获取浮点数各组成部分
   *
   * @param {Number} n 需要分解的数字
   * @returns 数字各组成部分
   * @memberof NumToChn
   */
  getParts(n) {
    const num = parseFloat(n)
    if (!this.isSafeNumber(num)) return '无法解析'

    const reg = /^([-+]?)(0|[1-9]\d*)(\.?)(\d*)$/

    const { 1: sign, 2: interger, 3: dot, 4: decimal } = reg.exec(
      num.toString()
    )

    return {
      sign,
      interger,
      dot,
      decimal
    }
  }

  /**
   * 获取点号对应中文
   *
   * @param {String} dotPart 点号部分
   * @returns 点号对应中文
   * @memberof NumToChn
   */
  getDotPartChn(dotPart) {
    if (typeof dotPart !== 'string') return '无法解析'
    return dotPart === '.' ? this.dotChar : ''
  }

  /**
   * 获取符号对应中文
   *
   * @param {String} signPart 符号部分
   * @returns 符号对应中文
   * @memberof NumToChn
   */
  getSignPartChn(signPart) {
    if (typeof signPart !== 'string') return '无法解析'
    return signPart === '-' ? this.signChar : ''
  }

  /**
   * 获取小数部分的中文表示
   *
   * @param {Number | String} deci 小数部分
   * @returns 小数部分的中文表示
   * @memberof NumToChn
   */
  getDecimalPartChn(n) {
    if (!this.isSafeNumber(parseInt(n)) || typeof n !== 'string') {
      return '参数为无法解析'
    }

    return n
      .toString()
      .split('')
      .map(item => this.getNumChar(item))
      .join('')
  }

  /**
   * 获取整数部分小节
   *
   * @param {String|Number} n 整数
   * @returns 小节数组
   * @memberof NumToChn
   */
  getIntergerSections(n) {
    let num = parseInt(n)

    if (!this.isSafeNumber(num) || num < 0) {
      return '参数无法解析或小于0'
    }

    if (num === 0) return [0]

    let temp = []

    while (num > 0) {
      temp.push(num % 10000)
      num = Math.floor(num / 10000)
    }
    return temp.reverse()
  }

  /**
   * 翻译小节
   * @param {Number|String} section 4位长度的小节
   * @returns 小节对应中文
   */
  getSectionsChn(section) {
    let num = parseInt(section)
    if (!this.isSafeNumber(num) || num >= 10000 || num < 0) {
      return '节无法解析成数字或位数超过4位或小于0'
    }

    let str = ''
    let needPadStartZero = false
    let unitCount = 0

    while (num > 0) {
      let g = num % 10 // 取个位数
      if (g === 0) {
        if (needPadStartZero) {
          needPadStartZero = false // 当前为0，已经补过零，下次若还为0则不需补
          str = this.padStr(str, 1, this.getNumChar(0))
        }
      } else {
        // 当前数不为0，默认下次为0，需要进行补零操作。
        needPadStartZero = true
        str = this.getNumChar(g) + this.getUnitChar(unitCount) + str
      }

      unitCount++
      num = Math.floor(num / 10)
    }

    return str
  }

  /**
   * 获取整数部分对应中文
   *
   * @param {String|Number} intergerPart 整数部分
   * @returns 整数部分对应中文
   * @memberof NumToChn
   */
  getIntergetPartChn(intergerPart) {
    const originNum = parseInt(intergerPart)
    if (!this.isSafeNumber(originNum) || originNum < 0) {
      return '无法解析成数字或超出范围或不是正数'
    }

    if (originNum === 0) return this.getNumChar(0)

    let sectionsArr = this.getIntergerSections(originNum)

    let transformedSectionsArr = sectionsArr
      .reverse() // 翻转小节，从最后一个小节开始翻译
      .reduce((acc, cur, index, arr) => {
        if (cur === 0) return acc

        // 非首小节并小于1000的需要前补零
        let sectionChn =
          index !== arr.length - 1 && cur < 1000
            ? this.padStr(this.getSectionsChn(cur), 1, this.getNumChar(0))
            : this.getSectionsChn(cur)

        // 处理首小节为10~19的特殊场景
        // 一十一，需要转换成十一
        if (index === arr.length - 1 && cur >= 10 && cur < 20) {
          sectionChn = sectionChn.replace(/^一/, '')
        }

        sectionChn += this.getSectionUnitChar(index)

        return acc.concat(sectionChn)
      }, [])

    return transformedSectionsArr.reverse().join('')
  }

  /**
   * 浮点数转中文数字
   * @param {String|Number} n 需要转换的数字
   * @returns 中文数字
   */
  transform(n) {
    const num = parseFloat(n)

    if (!this.isSafeNumber(num)) return '无法解析成数字或超出范围'

    const { sign, interger, dot, decimal } = this.getParts(num)

    const signChn = sign ? this.getSignPartChn(sign) : ''

    const intergerChn = this.getIntergetPartChn(interger)

    const dotChn = dot ? this.getDotPartChn(dot) : ''

    const decimalChn = decimal ? this.getDecimalPartChn(decimal) : ''

    return `${signChn}${intergerChn}${dotChn}${decimalChn}`
  }
}
