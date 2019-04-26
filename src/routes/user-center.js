/**
 * @author ghchu
 * @description 用户中心测试
 */

const UserCenter = () =>
  import(/* webpackChunkName:'UserCenter' */ 'Views/UserCenter/UserCenter')

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
