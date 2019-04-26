/**
 * @author ghchu
 * @description toast 测试页
 */

const ToastTest = () =>
  import(/* webpackChunkName:'ToastTest' */ 'Views/ToastTest/ToastTest')

export default [
  {
    path: '/toast-test',
    name: 'ToastTest',
    component: ToastTest,
    meta: {
      title: '测试ToastTest'
    }
  }
]
