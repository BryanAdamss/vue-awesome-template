/**
 * @author GuangHui
 * @description 用户中心测试
 */

const UserCenter = () =>
  import(/* webpackChunkName:'UserCenter' */ 'Views/UserCenter/UserCenter')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenter,
    meta: {
      title: '个人中心',
      requiresAuth: true
    }
  }
]
