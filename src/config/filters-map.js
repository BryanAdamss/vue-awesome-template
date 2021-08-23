/**
 * @author GuangHui
 * @description filtersMap
 */

import Num2Chn from '@bryanadamss/num2chn'

import {
  dateFormat,
  fixedDecimal,
  ms2hms,
  num2percentage,
  str2kebab
} from 'Utils'

const num2chn = new Num2Chn()
const numberToChn = val => num2chn.transform(val)

export const filtersMap =  {
  ms2hms,
  str2kebab,
  dateFormat,
  numberToChn,
  fixedDecimal,
  num2percentage
}
