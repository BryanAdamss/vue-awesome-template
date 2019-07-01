/**
 * @author GuangHui
 * @description 路由入口
 */

import affixTest from './affix-test'
import axiosTest from './axios-test'
import betterScrollTest from './better-scroll-test'
import clickAreaExpandTest from './click-area-expand-test'
import clickOutsideTest from './click-outside-test'
import confirmTest from './confirm-test'
import debounceThrottleTest from './debounce-throttle-test'
import downloaderTest from './downloader-test'
import dragTest from './drag-test'
import eventBusTest from './event-bus-test'
import formulaTest from './formula-test'
import goToTopTest from './go-to-top-test'
import home from './home'
import imgLazyloadTest from './img-lazyload-test'
import inputAutoHeightTest from './input-auto-height-test'
import layoutTest from './layout-test'
import listTransitionTest from './list-transition-test'
import loadingTest from './loading-test'
import login from './login'
import modalTest from './modal-test'
import numberToChineseTest from './number-to-chinese-test'
import popUpTest from './pop-up-test'
import preventFastClickTest from './prevent-fast-click-test'
import pullupTest from './pullup-test'
import saverTest from './saver-test'
import postMessageTest from './post-message-test'
import scrollbarTest from './scrollbar-test'
import swiperTest from './swiper-test'
import timeCounterTest from './time-counter-test'
import toastTest from './toast-test'
import userCenter from './user-center'
import vuexTest from './vuex-test'
import audioTest from './audio-test'
import svgIconTest from './svg-icon-test'

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
  ...affixTest,
  ...audioTest,
  ...axiosTest,
  ...betterScrollTest,
  ...clickAreaExpandTest,
  ...clickOutsideTest,
  ...confirmTest,
  ...debounceThrottleTest,
  ...downloaderTest,
  ...dragTest,
  ...eventBusTest,
  ...formulaTest,
  ...goToTopTest,
  ...home,
  ...imgLazyloadTest,
  ...inputAutoHeightTest,
  ...layoutTest,
  ...listTransitionTest,
  ...loadingTest,
  ...login,
  ...modalTest,
  ...numberToChineseTest,
  ...popUpTest,
  ...postMessageTest,
  ...preventFastClickTest,
  ...pullupTest,
  ...saverTest,
  ...scrollbarTest,
  ...swiperTest,
  ...timeCounterTest,
  ...toastTest,
  ...userCenter,
  ...vuexTest,
  ...svgIconTest
]
