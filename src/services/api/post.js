/**
 * @author GuangHui
 * @description 文章
 */

 export const getPostConfing = {
  name: 'getPost', // 【必填】接口调用名
  method: 'get', // 【必填】接口请求类型
  desc: '获取文章', // 【必填】接口描述
  path: '/api/posts', // 【必填】接口路径
  mockPath: '/mock/posts', // 【非必填】暂无mock平台，可不填
  mockEnable: false // 是否单独启用mock
}