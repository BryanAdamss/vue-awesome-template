# vue-awesome-template

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

![GitHub](https://img.shields.io/github/license/BryanAdamss/vue-awesome-template)
![GitHub issues](https://img.shields.io/github/issues/BryanAdamss/vue-awesome-template)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)

> A `Vue 2.x` project template base on `vue-cli 2.x`；分层思路参考[https://juejin.im/post/5b29c3bde51d45588d4d7110](https://juejin.im/post/5b29c3bde51d45588d4d7110)

## 特点

- `Commitizen friendly`
- `auto-prettier、auto-fix`支持
- 集成`vue`全家桶(vuex、vue-router、axios)
- 集成`element-ui`
- 支持`主题化`
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
  - svg 动态导入、sprite 化组件
  - ...
- 自造指令
  - textarea 自增高指令
  - affix 图钉固定指令
  - 移动端拖拽指令
  - 返回顶部指令
  - ...
- 常用库封装
  - 前端下载库
  - localStorage、sessionStorage 模块化封装
  - 多窗口 postMessage 封装
  - canvas 绘图板封装
  - 全局 loading 封装
  - 数字转中文库封装
  - directives、filters 加载器封装
  - 倒计时库封装
  - event-bus 封装
  - ...

- [常用 utils](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/index.js)

  - 分时函数
  - 去抖、节流函数
  - 获取随机数
  - shuffle 函数
  - unix 时间戳格式化函数
  - 查询字符串解析函数
  - 驼峰、帕斯卡转烤串转换函数
  - 毫秒转换为 时'分"秒 形式函数
  - 数字保留位数函数
  - 数字转百分比函数
  - 数组深度扁平化函数
  - emoji 过滤函数
  - url 中获取图片的流函数
  - blob、file、dataURL 相互转换函数

---

## vue 组件

- 翻页组件
  - [BaseSwiper](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseSwiper/BaseSwiper.vue)
- toast 组件
  - [toast](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseToast/BaseToast.js)
- 防暴击按钮组件
  - [防暴击按钮](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseBtnPreventFastClick.vue)
- 点击区域放大组件
  - [点击区域放大](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseClickAreaExpand.vue)
- 确认框组件
  - [确认框](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseConfirm.vue)
- latex 公式渲染组件
  - [latex 公式渲染](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseFormulaRender.vue)
- 圣杯布局组件
  - [圣杯布局](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseLayoutHorizontal.vue)
- 粘滞布局组件
  - [粘滞布局](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseLayoutVertical.vue)
- 列表过渡组件
  - [列表过渡](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseListTransition.vue)
- loading 组件
  - [loading](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseLoading.vue)
- loading spinner 组件
  - [loading spinner](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseLoadingSpinner.vue)
- modal 组件
  - [modal](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseModal.vue)
- popup 组件
  - [popup](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BasePopUp.vue)
- 模拟滚动组件
  - [模拟滚动](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseScroll.vue)
- 模拟滚动条组件
  - [模拟滚动条](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseScrollbar.vue)
- 路由切换动画组件
  - [路由切换动画](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/base/BaseTransitionSlide.vue)

## 常用库

- 前端下载库
  - [前端下载库](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/downloader.js)
- 全局 loading 库
  - [全局 loading](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/global-loading.js)
- 浮点数转中文库
  - [浮点数转中文](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/num-to-chn.js)
- 倒计时库
  - [倒计时库](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/time-counter.js)
- localStorage、sessionStorage 封装库
  - [localStorage、sessionStorage 封装库](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/saver.js)
- postMessage 封装库

  - [postMessage 封装库](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/plugins/messager.js)

## 指令库

- input、textarea 自增高指令
  - [input、textarea 自增高指令](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/directives/auto-height.js)
- 点击区域外指令
  - [点击区域外指令](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/directives/click-outside.js)
- 移动端拖动指令
  - [移动端拖动指令](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/directives/drag.js)
- 图钉 Affix 指令
  - [图钉 Affix 指令](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/directives/affix.js)

## utils

- 浏览器识别
  - [浏览器识别](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/browser.js)
- dom 操作
  - [dom 操作](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/dom.js)
- 缓动函数
  - [缓动函数](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/easings.js)
- file 常用类型转换
  - [file 常用类型转换](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/file-convert.js)
- raf 封装
  - [raf](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/raf.js)
- raf-animation 封装
  - [raf-animation](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/raf-animation.js)
- 获取滚动条宽度封装
  - [获取滚动条宽度](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/scrollbar-width.js)
- 类型判断封装
  - [类型判断](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/type-judge.js)
- 解析查询字符串、节流、去抖、分时封装
  - [解析查询字符串、节流、去抖、分时](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/utils/index.js)

## sass

- 网格
  - [网格](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/sass/layout/_gridNew.scss)
- 常用 functions
  - [常用 functions](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/sass/utils/_function.scss)
- 常用 mixins
  - [常用 mixins](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/sass/utils/_mixins.scss)
- 常用 placeholder
  - [常用 placeholder](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/sass/utils/_placeholder.scss)
- mediaQuery 封装

  - [mediaQuery 封装](https://github.com/BryanAdamss/vue-awesome-template/blob/master/src/sass/utils/_mediaQuery.scss)

## 其他项目

- [drawing-board](https://github.com/BryanAdamss/drawing-board)
  - 基于 canvas 的绘图板
- [fe-awesome-demos](https://github.com/BryanAdamss/fe-awesome-demos)
  - 前端入门 demo、最佳实践集合
- [WebpackTemplate](https://github.com/BryanAdamss/WebpackTemplate)
  - webpack 多页面脚手架 https://bryanadamss.github.io/2018/01/02/webpack-multi-page/
- [BryanAdamss.github.io](https://github.com/BryanAdamss/BryanAdamss.github.io)
  - 个人博客
    ...

## npm 包

- [@bryanadamss/drawing-board](https://www.npmjs.com/package/@bryanadamss/drawing-board)
- [@bryanadamss/num2chn](https://www.npmjs.com/package/@bryanadamss/num2chn)
- [ant-color-converter](https://www.npmjs.com/package/ant-color-converter)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [BryanAdamss@foxmail.com](https://github.com/BryanAdamss).<br />
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bryanadamss.github.io/"><img src="https://avatars3.githubusercontent.com/u/7441504?v=4" width="64px;" alt=""/><br /><sub><b>GuangHui</b></sub></a><br /><a href="#projectManagement-BryanAdamss" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
