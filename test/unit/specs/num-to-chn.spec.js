import Num2Chn from 'Plugins/num-to-chn'

describe('num-to-chn', () => {
  let num2Chn
  // 当前describe域中所有用例执行前触发
  beforeAll(() => {
    num2Chn = new Num2Chn()
  })

  // 当前describe域中所有用例执行后触发
  afterAll(() => {
    num2Chn = null
  })

  // isSafeNumber
  it('字符串3不是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber('3')).toBeFalsy()
  })

  it('数字3是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(3)).toBeTruthy()
  })

  it('Math.pow(2,53)不是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(Math.pow(2, 53))).toBeFalsy()
  })

  it('Math.pow(2,53)-1是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(Math.pow(2, 53) - 1)).toBeTruthy()
  })

  it('-Math.pow(2,53)不是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(-Math.pow(2, 53))).toBeFalsy()
  })

  it('-Math.pow(2,53)+1是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(-Math.pow(2, 53) + 1)).toBeTruthy()
  })

  it('NaN不是一个safeNumber', () => {
    expect(num2Chn.isSafeNumber(NaN)).toBeFalsy()
  })

  // padStr
  it('padStr返回值为字符串类型', () => {
    expect(typeof num2Chn.padStr('1', 1, '充')).toBe('string')
  })

  it('1前补4个0为00001', () => {
    expect(num2Chn.padStr('1', 4, '0')).toBe('00001')
  })

  it('1后补4个0为10000', () => {
    expect(num2Chn.padStr('1', 4, '0', false)).toBe('10000')
  })

  it('1前补-4个0应返回原值1', () => {
    expect(num2Chn.padStr('1', -4, '0')).toBe('1')
  })
})
