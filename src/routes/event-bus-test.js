/**
 * @author GuangHui
 * @description event-bus-test 测试页
 */

const EventBusTest = () =>
  import(/* webpackChunkName:'EventBusTest' */ 'Views/EventBusTest/EventBusTest')

export default [
  {
    path: '/event-bus-test',
    name: 'EventBusTest',
    component: EventBusTest,
    meta: {
      title: '测试EventBusTest'
    }
  }
]
