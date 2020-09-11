/**
 * @author GuangHui
 * @description filtersMap
 */

import NumberToChinese from 'Plugins/num-to-chn'

import {
  dateFormat,
  fixedDecimal,
  ms2hms,
  num2percentage,
  str2kebab
} from 'Utils'

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
