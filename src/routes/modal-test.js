/**
 * @author GuangHui
 * @description modal 测试页
 */
const ModalTest = () =>
  import(/* webpackChunkName:'ModalTest' */ 'Views/ModalTest/ModalTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/modal-test',
    name: 'ModalTest',
    component: ModalTest,
    meta: {
      title: '测试ModalTest'
    }
  }
]
