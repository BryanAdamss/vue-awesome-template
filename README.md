# vue-awesome-template

![GitHub](https://img.shields.io/github/license/BryanAdamss/vue-awesome-template)
![GitHub issues](https://img.shields.io/github/issues/BryanAdamss/vue-awesome-template)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

---

> 分层思路参考[https://juejin.im/post/5b29c3bde51d45588d4d7110](https://juejin.im/post/5b29c3bde51d45588d4d7110)

---

## 特点
- 集成全家桶
  - vue-router
  - axios
  - vuex
  - element-ui
  - sass样式库
  - ...
  
- 自造组件
  - 轮播
  - popup
  - toast
  - confirm
  - dialog
  - audio
  - loading
  - 公式渲染组件
  - 模拟滚动条组件
  - svg动态导入、sprite化组件
  - ...
  
- 自造指令
  - textarea自增高指令
  - affix图钉固定指令
  - 移动端拖拽指令
  - 返回顶部指令
  - ...
  
- 常用库封装
  - 前端下载库
  - localStorage、sessionStorage模块化封装
  - 多窗口postMessage封装
  - canvas绘图板封装
  - 全局loading封装
  - 数字转中文库封装
  - directives、filters加载器封装
  - 倒计时库封装
  - event-bus封装
  - ...
  
- [常用utils](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/index.js)
  - 分时函数
  - 去抖、节流函数
  - 获取随机数
  - shuffle函数
  - unix时间戳格式化函数
  - 查询字符串解析函数
  - 驼峰、帕斯卡转烤串转换函数
  - 毫秒转换为 时'分"秒 形式函数
  - 数字保留位数函数
  - 数字转百分比函数
  - 数组深度扁平化函数
  - emoji过滤函数
  - url中获取图片的流函数
  - blob、file、dataURL相互转换函数
  
---

## vue组件
- 翻页组件
  - [BaseSwiper](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseSwiper/BaseSwiper.vue)
- toast组件
  - [toast](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseToast/BaseToast.js)
- 防暴击按钮组件
  - [防暴击按钮](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseBtnPreventFastClick.vue)
- 点击区域放大组件
  - [点击区域放大](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseClickAreaExpand.vue)
- 确认框组件
  - [确认框](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseConfirm.vue)
- latex公式渲染组件
  - [latex公式渲染](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseFormulaRender.vue)
- 圣杯布局组件
  - [圣杯布局](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseLayoutHorizontal.vue)
- 粘滞布局组件
  - [粘滞布局](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseLayoutVertical.vue)
- 列表过渡组件
  - [列表过渡](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseListTransition.vue)
- loading组件
  - [loading](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseLoading.vue)
- loading spinner组件
  - [loading spinner](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseLoadingSpinner.vue)
- modal组件
  - [modal](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseModal.vue)
- popup组件
  - [popup](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BasePopUp.vue)
- 模拟滚动组件
  - [模拟滚动](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseScroll.vue)
- 模拟滚动条组件
  - [模拟滚动条](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseScrollbar.vue)
- 路由切换动画组件
  - [路由切换动画](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/base/BaseTransitionSlide.vue)

## 常用库
- 前端下载库
  - [前端下载库](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/downloader.js)
- 全局loading库
  - [全局loading](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/global-loading.js)
- 浮点数转中文库
  - [浮点数转中文](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/num-to-chn.js)
- 倒计时库
  - [倒计时库](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/time-counter.js)
- localStorage、sessionStorage封装库
  - [localStorage、sessionStorage封装库](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/saver.js)
- postMessage封装库
  - [postMessage封装库](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/plugins/messager.js)
  

## 指令库
- input、textarea自增高指令
  - [input、textarea自增高指令](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/directives/auto-height.js)
- 点击区域外指令
  - [点击区域外指令](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/directives/click-outside.js)
- 移动端拖动指令
  - [移动端拖动指令](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/directives/drag.js)
- 图钉Affix指令
  - [图钉Affix指令](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/directives/affix.js)

## utils
- 浏览器识别
  - [浏览器识别](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/browser.js)
- dom操作
  - [dom操作](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/dom.js)
- 缓动函数
  - [缓动函数](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/easings.js)
- file常用类型转换
  - [file常用类型转换](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/file-convert.js)
- raf封装
  - [raf](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/raf.js)
- raf-animation封装
  - [raf-animation](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/raf-animation.js)
- 获取滚动条宽度封装
  - [获取滚动条宽度](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/scrollbar-width.js)
- 类型判断封装
  - [类型判断](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/type-judge.js)
- 解析查询字符串、节流、去抖、分时封装
  - [解析查询字符串、节流、去抖、分时](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/utils/index.js)

## sass
- 网格
  - [网格](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/sass/layout/_gridNew.scss)
- 常用functions
  - [常用functions](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/sass/utils/_function.scss)
- 常用mixins
  - [常用mixins](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/sass/utils/_mixins.scss)
- 常用placeholder
  - [常用placeholder](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/sass/utils/_placeholder.scss)
- mediaQuery封装
  - [mediaQuery封装](https://github.com/BryanAdamss/vue-10w-template/blob/master/src/sass/utils/_mediaQuery.scss)
  
## 其他项目
- [drawing-board](https://github.com/BryanAdamss/drawing-board)
  - 基于canvas的绘图板
- [fe-awesome-demos](https://github.com/BryanAdamss/fe-awesome-demos)
  - 前端入门demo、最佳实践集合
- [WebpackTemplate](https://github.com/BryanAdamss/WebpackTemplate)
  - webpack多页面脚手架 https://bryanadamss.github.io/2018/01/02/webpack-multi-page/
- [BryanAdamss.github.io](https://github.com/BryanAdamss/BryanAdamss.github.io)
  - 个人博客
...

## npm 包
- [@bryanadamss/drawing-board](https://www.npmjs.com/package/@bryanadamss/drawing-board)
- [ant-color-converter](https://www.npmjs.com/package/ant-color-converter)

