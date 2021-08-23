/**
 * @author GuangHui
 * @description 通用接口定义
 */

export const getPermissionConfig = {
  name: 'getPermission', // 【必填】接口调用名
  method: 'post',// 【必填】接口请求类型
  desc: '获取权限',// 【必填】接口描述
  path: '/hw/authority', // 【必填】接口路径
  mockPath: '/mock/authority', // 【非必填】暂无mock平台，可不填
  mockEnable: false // 是否单独启用mock
}
