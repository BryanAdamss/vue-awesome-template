/**
 * @author GuangHui
 * @description toast 测试页
 */

const ToastTest = () =>
  import(/* webpackChunkName:'ToastTest' */ 'Views/ToastTest/ToastTest')

// eslint-disable-next-line no-restricted-syntax
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
