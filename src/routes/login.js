/**
 * @author GuangHui
 * @description 登录
 */

const Login = () => import(/* webpackChunkName:'Login' */ 'Views/Login/Login')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登陆'
    }
  }
]
