/**
 * @author GuangHui
 * @description audio-test 测试页
 */

const AudioTest = () =>
  import(/* webpackChunkName:'AudioTest' */ 'Views/AudioTest/AudioTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/audio-test',
    name: 'AudioTest',
    component: AudioTest,
    meta: {
      title: '测试AudioTest'
    }
  }
]
