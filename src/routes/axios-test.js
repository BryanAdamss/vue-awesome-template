/**
 * @author GuangHui
 * @description axios 测试页
 */

const AxiosTest = () =>
  import(/* webpackChunkName:'AxiosTest' */ 'Views/AxiosTest/AxiosTest')

const AxiosListDetailTest = () =>
  import(
    /* webpackChunkName:'AxiosListDetailTest' */ 'Views/AxiosListDetailTest/AxiosListDetailTest'
  )

export default [
  {
    path: '/axios-test',
    name: 'AxiosTest',
    component: AxiosTest,
    meta: {
      title: '测试AxiosTest'
    }
  },
  {
    path: '/axios-test/:id',
    name: 'AxiosListDetailTest',
    component: AxiosListDetailTest,
    meta: {
      title: '测试AxiosListDetailTest'
    },
    // * route.params 将会被设置为组件属性
    props: true
  }
]
