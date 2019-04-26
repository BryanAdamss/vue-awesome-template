/**
 * @author GuangHui
 * @description 登录
 */

const Login = () => import(/* webpackChunkName:'Login' */ 'Views/Login/Login')

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
