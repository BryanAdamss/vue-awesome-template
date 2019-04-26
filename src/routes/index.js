/**
 * @author GuangHui
 * @description 路由入口
 */

import others from './others'

export default [
  {
    // * 所有未匹配到的路由，重定向到Index路由上
    path: '*',
    redirect: {
      name: 'Index'
    }
  },
  {
    path: '/',
    // * 每个路由需要取名，采用帕斯卡风格
    name: 'Index',
    redirect: {
      name: 'Home'
    }
  },
  ...others
]
