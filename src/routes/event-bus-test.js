/**
 * @author GuangHui
 * @description event-bus-test 测试页
 */

const EventBusTest = () =>
  import(
    /* webpackChunkName:'EventBusTest' */ 'Views/EventBusTest/EventBusTest'
  )

// eslint-disable-next-line no-restricted-syntax
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
