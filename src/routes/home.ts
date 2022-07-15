/**
 * @author GuangHui
 * @description Home
 */

import Home from '@/views/Home/Home.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Home/About.vue'),
  },
]
