/**
 * @author GuangHui
 * @description filtersMap
 */

import {
  dateFormat,
  str2kebab,
  ms2hms,
  num2percentage,
  fixedDecimal
} from 'Utils'

import NumberToChinese from 'Plugins/num-to-chn'

const num2chn = new NumberToChinese()
const numberToChn = val => num2chn.transform(val)

export default {
  ms2hms,
  str2kebab,
  dateFormat,
  numberToChn,
  fixedDecimal,
  num2percentage
}
