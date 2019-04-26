/**
 * @author ghchu
 * @description 首页
 */

// * 首页可使用同步导入
import Home from 'Views/home/home'
// * 同步导入（可优化成下面的动态导入）

// * 使用异步载入
const HomeChild1 = () =>
  import(/* webpackChunkName:'HomeChild1' */ 'Views/Home/HomeChild1')

const HomeChild2 = () =>
  import(/* webpackChunkName:'HomeChild2' */ 'Views/Home/HomeChild2')

export default [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // * 利用meta保存一些元信息，用来设置跳转后的title
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'child1',
        name: 'HomeChild1',
        component: HomeChild1,
        meta: {
          title: '首页-child1'
        }
      },
      {
        path: 'child2',
        name: 'HomeChild2',
        component: HomeChild2,
        meta: {
          title: '首页-child2'
        }
      }
    ]
  }
]
