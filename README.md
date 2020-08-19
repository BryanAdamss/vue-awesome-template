# vue-awesome-template

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

![GitHub](https://img.shields.io/github/license/BryanAdamss/vue-awesome-template)
![GitHub issues](https://img.shields.io/github/issues/BryanAdamss/vue-awesome-template)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)

- > 一个基于`vue-cli@4.x`的`Vue@2.x`项目最佳实践模板(持续更新中 ✨)
- > 如果您使用`vue-cli@2.x`版本，可以查看[cli-2.x 分支](https://github.com/BryanAdamss/vue-awesome-template/tree/cli-2.x)

## 特性

- 项目分层合理，经受住 10w 行业务代码项目实践检验
  - 分层思路参考[https://juejin.im/post/5b29c3bde51d45588d4d7110](https://juejin.im/post/5b29c3bde51d45588d4d7110)
- 集成`css3 vars`主题切换服务，支持自定义主题
  - 支持生成调色板`npm run color`
- 集成`vue`全家桶(vuex、vue-router、axios)及各种最佳实践
- 集成`element-ui`及各种自造轮子
- 集成`webpack`优化最佳实践
- 注释完备
  - 每一个`commit`都有详细注释，可供新手学习

## 安装及快速开始

- 安装

```sh
git clone git@github.com:BryanAdamss/vue-awesome-template.git

npm i

npm run serve
```

- 命令

```js
  "scripts": {
    "serve": "vue-cli-service serve", // 开发
    "build": "vue-cli-service build", // 生产包
    "build:modern": "vue-cli-service build --modern", // 现代打包模式
    "build:testing": "vue-cli-service build --mode testing", // 测试环境
    "build:analysis": "vue-cli-service build --mode analysis", // 打包分析
    "test:unit": "vue-cli-service test:unit", // 单元测试
    "test:e2e": "vue-cli-service test:e2e", // e2e测试
    "ls-lint":"ls-lint",// 命名检测
    "lint": "vue-cli-service lint", // lint
    "lint:fix": "vue-cli-service lint --fix", // lint fix
    "inspect": "vue-cli-service inspect > webpack.inspect.js", // 检查development webpack配置
    "inspect:production": "vue-cli-service inspect --mode production > webpack.inspect.js", // 检查production webpack配置
    "commit": "git-cz", // git 提交
    "contributor:add": "all-contributors add", // 添加贡献者
    "contributor:generate": "all-contributors generate", // 生成贡献者文件
    "contributor:init": "all-contributors init", // 贡献者初始化
    "release": "standard-version", // 发版
    "release:first": "npm run release -- --first-release", // 初始发版
    "release:major": "npm run release -r major", // break change版本
    "release:minor": "npm run release -r minor", // feature 版本
    "release:patch": "npm run release -r patch", // fix 补丁版本
    "release:publish": "git push --follow-tags origin master", // 发布到npm
    "new:comp": "node node_modules/@bryanadamss/generate-file", // 生成vue模板文件
    "stylelint": "stylelint", // 样式lint
    "stylelint:fix": "stylelint --fix", // 样式修复
    "treer": "treer -e project-structure.txt -i node_modules", // 查看当前项目结构树
    "color": "color-palette --input src/sass/utils/_color-base.scss --output src/sass/utils/_color-palette.scss --sassMap" // 生成调色板
  }
```

## 目录结构

```sh
├─.all-contributorsrc                       # all-contributors配置
├─.browserslistrc                           # 浏览器兼容列表
├─.env                                      # 通用环境配置文件
├─.env.analysis                             # 打包分析环境配置文件
├─.env.development                          # 开发环境配置文件
├─.env.production                           # 生产环境配置文件
├─.env.testing                              # 测试环境配置文件
├─.eslintrc.js                              # eslint配置
├─.gitignore
├─.prettierrc                               # prettier配置
├─.stylelintrc                              # style-lint配置
├─babel.config.js                           # babel配置
├─CHANGELOG.md                              # 更新记录
├─commitlint.config.js                      # commitlint配置
├─.ls-lint.yml                              # ls-lint配置(命名检测)
├─cypress.json                              # e2e测试配置
├─jest.config.js                            # 单元测试配置
├─LICENSE                                   # 版权文件
├─package-lock.json
├─package.json
├─project-structure                         # 项目目录结构
├─README.md                                 # 文档
├─vue.config.js                             # vue project配置文件
├─tests                                     # 测试用例文件夹
├─src                                       # 源目录
|  ├─App.vue                                # 根组件
|  ├─main.js                                # 主入口
|  ├─register-service-worker.js             # sw
|  ├─views                                  # 页面目录
|  ├─utils                                  # 常用工具
|  ├─store                                  # vuex 全局状态
|  ├─services                               # 业务service
|  ├─sass                                   # sass分层
|  ├─routes                                 # 路由模块
|  ├─plugins                                # 项目插件
|  ├─directives                             # vue 指令
|  ├─config                                 # 项目配置
|  ├─components                             # 业务组件
|  ├─base                                   # 基础组件
|  ├─assets                                 # 静态资源
├─public                                    # 无需webpack处理的静态资源
```

## 基础组件

- 除了项目本身已经集成的`element-ui`相关组件，你还可以使用一些`自造的基础组件`，这些组件是与业务无关的，可以跨业务、跨项目使用(后期考虑直接打成一个`npm包`发布到`npm`上管理)
- 位于`src/base`目录下

```sh
├─src
|  ├─base
|  |  ├─BaseAudio.vue                       # 音频播放组件
|  |  ├─BaseBreadcrumb.vue                  # 面包屑
|  |  ├─BaseBreadcrumbItem.vue              # 面包屑-item
|  |  ├─BaseBtnPreventFastClick.vue         # 防暴击按钮组件
|  |  ├─BaseCircleProgress.vue              # 环形进度组件
|  |  ├─BaseClickAreaExpand.vue             # 拓宽点击区域的按钮组件
|  |  ├─BaseConfirm.vue                     # confirm组件
|  |  ├─BaseCountInput.vue                  # 计数input组件
|  |  ├─BaseDynamicCursor.vue               # 动态游标tab组件
|  |  ├─BaseFormulaRender.vue               # latex公式渲染组件
|  |  ├─BaseLayoutHorizontal.vue            # 水平三分布局组件
|  |  ├─BaseLayoutVertical.vue              # 垂直三分布局组件
|  |  ├─BaseListTransition.vue              # 列表过渡组件
|  |  ├─BaseLoading.vue                     # loading组件
|  |  ├─BaseLoadingSpinner.vue              # loading-spinner组件
|  |  ├─BaseModal.vue                       # 模态框组件
|  |  ├─BaseNoOpenerAnchor.vue              # noopenner 锚点组件
|  |  ├─BasePopUp.vue                       # popup组件
|  |  ├─BaseScroll.vue                      # 移动端滚动组件
|  |  ├─BaseScrollbar.vue                   # 自定义滚动条组件
|  |  ├─BaseScrollTab.vue                   # 滚动tab组件
|  |  ├─BaseSvgIcon.vue                     # svg icon组件
|  |  ├─BaseTransitionFade.vue              # fade过渡动画组件
|  |  ├─BaseTransitionSlide.vue             # slide过渡动画组件
|  |  ├─BaseToast                           # toast组件
|  |  |     └BaseToast.js
|  |  ├─BaseSwiper                          # 轮播组件
|  |  |     ├─BaseSwiper.vue
|  |  |     └BaseSwiperSlide.vue
```

## 业务组件

- 与业务相关度高的组件

```sh
├─src
|  ├─components
|     ├─Dialog.vue                          # 基于BasePopUp封装的弹窗组件
```

## 常用插件

- 主要集中在`src/plugins`下

```sh
├─src
|  ├─plugins
|  |    ├─api-builder.js                    # api构建器
|  |    ├─axios-instance.js                 # axios实例
|  |    ├─component-register.js             # element-ui注册
|  |    ├─const-loader.js                   # 常量加载器
|  |    ├─directives-loader.js              # 指令加载器
|  |    ├─downloader.js                     # 前端下载库
|  |    ├─drawing-board.js                  # 绘图板
|  |    ├─event-bus.js                      # 事件总线
|  |    ├─fastclick-binder.js               # fast-click绑定器
|  |    ├─global-loading.js                 # 全局loading
|  |    ├─injecter.js                       # vue原型方法、全局方法注入器
|  |    ├─messager.js                       # post-message封装
|  |    ├─num-to-chn.js                     # 数字转中文
|  |    ├─postcss-plugin-add-var-value.js   # cssvars兼容插件
|  |    ├─register.js                       # 指令、filter注册器
|  |    ├─router-instance.js                # 路由实例
|  |    ├─routes-loader.js                  # 路由加载器
|  |    ├─saver.js                          # localStorage封装
|  |    ├─theme-service.js                  # 主题切换服务
|  |    ├─time-counter.js                   # 计数器
|  |    ├─vconsole-provider.js              # vconsle动态加载器
|  |    └vuex-instance.js                   # vuex实例
```

## 常用指令

- 集中在`src/directives`下

```sh
├─src
|  ├─directives
|  |     ├─affix.js                         # 图钉指令
|  |     ├─auto-height.js                   # input自增高
|  |     ├─click-outside.js                 # click-outside
|  |     ├─drag.js                          # 拖拽
|  |     ├─focus.js                         # 聚焦
|  |     ├─go-to-top.js                     # 回到顶部
|  |     └pull-up.js                        # 上拉加载
```

## 常用工具

- 集中在`src/utils`下

```sh
├─src
|  ├─utils
|  |   ├─browser.js                         # 浏览器相关
|  |   ├─copy.js                            # 复制到剪切板
|  |   ├─dom.js                             # dom相关
|  |   ├─easings.js                         # 缓动动画
|  |   ├─file-convert.js                    # file转换
|  |   ├─index.js                           # 其它
|  |   ├─raf-animation.js                   # raf动画
|  |   ├─raf.js                             # raf
|  |   ├─scrollbar-width.js                 # 滚动条宽度
|  |   ├─select.js                          # 选中文案
|  |   ├─type-judge.js                      # 类型判断
|  |   └url.js                              # url相关
```

## 样式

- **支持主题化配置**
  - 使用`css3 vars`实现自定义主题
  - 集成`css-vars-ponyfill`、`MutationObserver`兼容 IE
  - 封装主题切换服务`theme-services`
    - 具体见`src/views/ThemeChangeTest/ThemeChangeTest.vue`
- 采用`scss`风格，根据功能进行分层
- 集中在`src/sass`下

```sh
├─src
|  ├─sass
|  |  ├─common-m.scss                       # 通用
|  |  ├─loading.scss                        # loading相关
|  |  ├─vendors                             # 三方库(弃用)
|  |  |    ├─_c_imgSlider.scss
|  |  |    └_c_pagination.scss
|  |  ├─utils
|  |  |   ├─_color-base.scss                # 基础色
|  |  |   ├─_color-palette.scss             # 调色板(可用gen:color脚本根据_color-base生成)
|  |  |   ├─_function.scss                  # sass function
|  |  |   ├─_mediaQuery.scss                # 媒体查询
|  |  |   ├─_mixins.scss                    # sass mixins
|  |  |   ├─_placeholders.scss              # sass placeholder
|  |  |   ├─_utils.scss                     # 工具集合
|  |  |   ├─_vars-default.scss              # 默认变量
|  |  |   ├─_vars-m.scss                    # 移动端变量
|  |  |   └_vars.scss                       # 非pc端变量
|  |  ├─modules
|  |  |    ├─_animate.scss                  # 动画
|  |  |    ├─_button.scss                   # 按钮
|  |  |    ├─_form.scss                     # 表单
|  |  |    ├─_loading.scss                  # loading
|  |  |    ├─_root.scss                     # :root(挂载css3 vars)
|  |  |    └_table.scss                     # 表格
|  |  ├─layout
|  |  |   ├─_grid.scss                      # 网格(弃用)
|  |  |   └_gridNew.scss                    # 网格
|  |  ├─helpers
|  |  |    └_helpers.scss                   # sass helper
|  |  ├─base
|  |  |  ├─_normalize.scss                  # 重置样式
|  |  |  └_typography.scss                  # 排版
```

## 代码风格、发包

- 集成`eslint`、`prettier`、`style-lint`、`commitlint`、`ls-lint(命名检测)`开箱即用
- 集成`standard-version`标准化发包

## mock

- 相关配置在`./mock`下

## webpack 相关

- 相关配置在`vue.config.js`
  - 秉承着能用插件实现的绝不手动写的原则
- 自动别名
  - 通过自造插件实现[vue-cli-plugin-auto-alias](https://www.npmjs.com/package/vue-cli-plugin-auto-alias)
- 生产 cdn
  - 通过`webpack-cdn-plugin`
- svg 雪碧图
- sass 公用资源
  - 通过`vue-cli-plugin-style-resources-loader`插件实现
- 开启本地生成`gzip`
- 开启打包分析

## 其他项目

- [drawing-board](https://github.com/BryanAdamss/drawing-board)
  - 基于 canvas 的绘图板
- [fe-awesome-demos](https://github.com/BryanAdamss/fe-awesome-demos)
  - 前端入门 demo、最佳实践集合
- [WebpackTemplate](https://github.com/BryanAdamss/WebpackTemplate)
  - webpack 多页面脚手架 https://bryanadamss.github.io/2018/01/02/webpack-multi-page/
- [BryanAdamss.github.io](https://github.com/BryanAdamss/BryanAdamss.github.io)
  - 个人博客

## npm 包

- [vue-cli-plugin-auto-alias](https://www.npmjs.com/package/vue-cli-plugin-auto-alias)
- [@bryanadamss/drawing-board](https://www.npmjs.com/package/@bryanadamss/drawing-board)
- [@bryanadamss/num2chn](https://www.npmjs.com/package/@bryanadamss/num2chn)
- [ant-color-converter](https://www.npmjs.com/package/ant-color-converter)

## 支持

如果你觉得对你有帮助，可以给我一个小星星 ⭐️

## 版权

Copyright © 2020 [BryanAdamss@foxmail.com](https://github.com/BryanAdamss).<br />
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

## 贡献者 ✨

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
