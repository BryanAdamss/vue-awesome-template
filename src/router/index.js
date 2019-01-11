import Vue from 'vue'
import Router from 'vue-router'

import { STATUS_OK } from 'Api/config'

// * 同步导入（可优化成下面的动态导入）
// import Home from 'Views/home/home'
// import UserCenter from 'Views/UserCenter/UserCenter'

// * 使用动态载入
const Home = resolve => {
  import(/* webpackChunkName:'Home' */ 'Views/Home/Home').then(module => {
    resolve(module)
  })
}

const HomeChild1 = resolve => {
  import(/* webpackChunkName:'HomeChild1' */ 'Views/Home/HomeChild1').then(
    module => {
      resolve(module)
    }
  )
}

const HomeChild2 = resolve => {
  import(/* webpackChunkName:'HomeChild2' */ 'Views/Home/HomeChild2').then(
    module => {
      resolve(module)
    }
  )
}

const UserCenter = resolve => {
  import(/* webpackChunkName:'UserCenter' */ 'Views/UserCenter/UserCenter').then(
    module => {
      resolve(module)
    }
  )
}

const Login = resolve => {
  import(/* webpackChunkName:'Login' */ 'Views/Login/Login').then(module => {
    resolve(module)
  })
}

const VuexTest = resolve => {
  import(/* webpackChunkName:'VuexTest' */ 'Views/VuexTest/VuexTest').then(
    module => {
      resolve(module)
    }
  )
}

const ClickOutSideTest = resolve => {
  import(/* webpackChunkName:'ClickOutSideTest' */ 'Views/ClickOutSideTest/ClickOutSideTest').then(
    module => {
      resolve(module)
    }
  )
}

const ImgLazyLoadTest = resolve => {
  import(/* webpackChunkName:'ImgLazyLoadTest' */ 'Views/ImgLazyLoadTest/ImgLazyLoadTest').then(
    module => {
      resolve(module)
    }
  )
}

const AxiosTest = resolve => {
  import(/* webpackChunkName:'AxiosTest' */ 'Views/AxiosTest/AxiosTest').then(
    module => {
      resolve(module)
    }
  )
}

const AxiosListDetailTest = resolve => {
  import(/* webpackChunkName:'AxiosListDetailTest' */ 'Views/AxiosListDetailTest/AxiosListDetailTest').then(
    module => {
      resolve(module)
    }
  )
}

const InputAutoHeightTest = resolve => {
  import(/* webpackChunkName:'InputAutoHeightTest' */ 'Views/InputAutoHeightTest/InputAutoHeightTest').then(
    module => {
      resolve(module)
    }
  )
}

const BetterScrollTest = resolve => {
  import(/* webpackChunkName:'BetterScrollTest' */ 'Views/BetterScrollTest/BetterScrollTest').then(
    module => {
      resolve(module)
    }
  )
}

const DragTest = resolve => {
  import(/* webpackChunkName:'DragTest' */ 'Views/DragTest/DragTest').then(
    module => {
      resolve(module)
    }
  )
}

const ModalTest = resolve => {
  import(/* webpackChunkName:'ModalTest' */ 'Views/ModalTest/ModalTest').then(
    module => {
      resolve(module)
    }
  )
}

const PopUpTest = resolve => {
  import(/* webpackChunkName:'PopUpTest' */ 'Views/PopUpTest/PopUpTest').then(
    module => {
      resolve(module)
    }
  )
}

const ToastTest = resolve => {
  import(/* webpackChunkName:'ToastTest' */ 'Views/ToastTest/ToastTest').then(
    module => {
      resolve(module)
    }
  )
}

const ConfirmTest = resolve => {
  import(/* webpackChunkName:'ConfirmTest' */ 'Views/ConfirmTest/ConfirmTest').then(
    module => {
      resolve(module)
    }
  )
}

const GoToTopTest = resolve => {
  import(/* webpackChunkName:'GoToTopTest' */ 'Views/GoToTopTest/GoToTopTest').then(
    module => {
      resolve(module)
    }
  )
}

const ClickAreaExpandTest = resolve => {
  import(/* webpackChunkName:'ClickAreaExpandTest' */ 'Views/ClickAreaExpandTest/ClickAreaExpandTest').then(
    module => {
      resolve(module)
    }
  )
}

const DebounceThrottleTest = resolve => {
  import(/* webpackChunkName:'DebounceThrottleTest' */ 'Views/DebounceThrottleTest/DebounceThrottleTest').then(
    module => {
      resolve(module)
    }
  )
}

const PreventFastClickBtnTest = resolve => {
  import(/* webpackChunkName:'PreventFastClickBtnTest' */ 'Views/PreventFastClickBtnTest/PreventFastClickBtnTest').then(
    module => {
      resolve(module)
    }
  )
}

const ListTransitionTest = resolve => {
  import(/* webpackChunkName:'ListTransitionTest' */ 'Views/ListTransitionTest/ListTransitionTest').then(
    module => {
      resolve(module)
    }
  )
}

const LayoutTest = resolve => {
  import(/* webpackChunkName:'LayoutTest' */ 'Views/LayoutTest/LayoutTest').then(
    module => {
      resolve(module)
    }
  )
}

const EventBusTest = resolve => {
  import(/* webpackChunkName:'EventBusTest' */ 'Views/EventBusTest/EventBusTest').then(
    module => {
      resolve(module)
    }
  )
}

const LoadingTest = resolve => {
  import(/* webpackChunkName:'LoadingTest' */ 'Views/LoadingTest/LoadingTest').then(
    module => {
      resolve(module)
    }
  )
}

const PullupTest = resolve => {
  import(/* webpackChunkName:'PullupTest' */ 'Views/PullupTest/PullupTest').then(
    module => {
      resolve(module)
    }
  )
}

const SwiperTest = resolve => {
  import(/* webpackChunkName:'SwiperTest' */ 'Views/SwiperTest/SwiperTest').then(
    module => {
      resolve(module)
    }
  )
}

const FormulaRenderTest = resolve => {
  import(/* webpackChunkName:'FormulaRenderTest' */ 'Views/FormulaRenderTest/FormulaRenderTest').then(
    module => {
      resolve(module)
    }
  )
}

Vue.use(Router)

const router = new Router({
  routes: [
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
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter,
      meta: {
        title: '个人中心',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/vuex-test',
      name: 'VuexTest',
      component: VuexTest,
      meta: {
        title: '测试Vuex'
      }
    },
    {
      path: '/click-outside-test',
      name: 'ClickOutSideTest',
      component: ClickOutSideTest,
      meta: {
        title: '测试自定义指令clickOutside'
      }
    },
    {
      path: '/img-lazy-load-test',
      name: 'ImgLazyLoadTest',
      component: ImgLazyLoadTest,
      meta: {
        title: '测试ImgLazyLoadTest'
      }
    },
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
    },
    {
      path: '/input-auto-height-test',
      name: 'InputAutoHeightTest',
      component: InputAutoHeightTest,
      meta: {
        title: '测试InputAutoHeightTest'
      }
    },
    {
      path: '/better-scroll-test',
      name: 'BetterScrollTest',
      component: BetterScrollTest,
      meta: {
        title: '测试BetterScrollTest'
      }
    },
    {
      path: '/drag-test',
      name: 'DragTest',
      component: DragTest,
      meta: {
        title: '测试DragTest'
      }
    },
    {
      path: '/modal-test',
      name: 'ModalTest',
      component: ModalTest,
      meta: {
        title: '测试ModalTest'
      }
    },
    {
      path: '/pop-up-test',
      name: 'PopUpTest',
      component: PopUpTest,
      meta: {
        title: '测试PopUpTest'
      }
    },
    {
      path: '/toast-test',
      name: 'ToastTest',
      component: ToastTest,
      meta: {
        title: '测试ToastTest'
      }
    },
    {
      path: '/confirm-test',
      name: 'ConfirmTest',
      component: ConfirmTest,
      meta: {
        title: '测试ConfirmTest'
      }
    },
    {
      path: '/go-to-top-test',
      name: 'GoToTopTest',
      component: GoToTopTest,
      meta: {
        title: '测试GoToTopTest'
      }
    },
    {
      path: '/click-area-expand-test',
      name: 'ClickAreaExpandTest',
      component: ClickAreaExpandTest,
      meta: {
        title: '测试ClickAreaExpandTest'
      }
    },
    {
      path: '/debounce-throttle-test',
      name: 'DebounceThrottleTest',
      component: DebounceThrottleTest,
      meta: {
        title: '测试DebounceThrottleTest'
      }
    },
    {
      path: '/prevent-fast-click-test',
      name: 'PreventFastClickBtnTest',
      component: PreventFastClickBtnTest,
      meta: {
        title: '测试PreventFastClickBtnTest'
      }
    },
    {
      path: '/list-transition-test',
      name: 'ListTransitionTest',
      component: ListTransitionTest,
      meta: {
        title: '测试ListTransitionTest'
      }
    },
    {
      path: '/layout-test',
      name: 'LayoutTest',
      component: LayoutTest,
      meta: {
        title: '测试LayoutTest'
      }
    },
    {
      path: '/event-bus-test',
      name: 'EventBusTest',
      component: EventBusTest,
      meta: {
        title: '测试EventBusTest'
      }
    },
    {
      path: '/loading-test',
      name: 'LoadingTest',
      component: LoadingTest,
      meta: {
        title: '测试LoadingTest'
      }
    },
    {
      path: '/pullup-test',
      name: 'PullupTest',
      component: PullupTest,
      meta: {
        title: '测试PullupTest'
      }
    },
    {
      path: '/swiper-test',
      name: 'SwiperTest',
      component: SwiperTest,
      meta: {
        title: '测试SwiperTest'
      }
    },
    {
      path: '/formula-test',
      name: 'FormulaRenderTest',
      component: FormulaRenderTest,
      meta: {
        title: '测试FormulaRenderTest'
      }
    }
  ]
})

// * 注册全局守卫
router.beforeEach((to, from, next) => {
  // * 路由到达前修改title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const LOGGED = sessionStorage.getItem('__auth__logged')
    if (!LOGGED || parseInt(LOGGED) !== STATUS_OK) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
