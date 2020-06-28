/**
 * @author GuangHui
 * @description 通用接口定义
 */

export default [
  {
    name: 'getPost', // 【必填】接口调用名
    method: 'get',
    desc: '获取文章',
    path: '/api/posts', // 【必填】接口路径
    mockPath: '/mock/posts', // 【非必填】暂无mock平台，可不填
    params: { id: '12312312' }, // 【必填】接口参数模板(若调用时未传参数，将以此值为默认参数)
    mockEnable: true // 是否单独启用mock
  }
]
