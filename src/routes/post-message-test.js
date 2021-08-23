/**
 * @author GuangHui
 * @description postMessage 测试页
 */

const PostMessageTest = () =>
  import(
    /* webpackChunkName:'PostMessageTest' */ 'Views/PostMessageTest/PostMessageTest'
  )
const PostMessageTestFrame = () =>
  import(
    /* webpackChunkName:'PostMessageTestFrame' */ 'Views/PostMessageTest/PostMessageTestFrame'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/post-message-test',
    name: 'PostMessageTest',
    component: PostMessageTest,
    meta: {
      title: '测试PostMessageTest'
    }
  },
  {
    path: '/post-message-test/inner-frame',
    name: 'PostMessageTestFrame',
    component: PostMessageTestFrame,
    meta: {
      title: '测试PostMessageTestFrame'
    }
  }
]
