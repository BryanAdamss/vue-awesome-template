# vue-awesome-template

> 💥 Important!!! The old template `cli-2.x` and `cli@4.x` are archived,please check the guide below.

- If you use `vue@2.x` and `vue-cli@2.x`,please check branch [cli-2.x](https://github.com/BryanAdamss/vue-awesome-template/tree/cli-2.x)
- If you use `vue@2.6.12` and `vue-cli@4.x`,please check branch [vue2.6.12_base_on_vue-cli@4.x](https://github.com/BryanAdamss/vue-awesome-template/tree/vue2.6.12_base_on_vue-cli%404.x)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## TODO

- [x] 约束镜像源和`npm、node、pnpm`版本
- [x] 仅允许使用`pnpm`
- [x] `Eslint` + `prettier` ready
- [x] `vite`配置拆分
- [x] 集成`tailwindcss`
- [x] 构建`gzip`
- [x] 多构建环境区分
- [x] 目录分层
- [x] `TS`支持
- [x] `html`支持`env变量`
- [x] 支持三方包拆分到独自的`chunk`中
- [ ] 主题化
- [ ] `svg` 集成
- [ ] `vueuse`集成
- [ ] `TSX`支持
- [x] `Vue3API自动导入`支持
- [x] 深色模式支持
- [x] `Inspect调试`支持
- [ ] 组件模板生成/移除
- [ ] `i18n`支持
- [x] 支持`event-bus`（基于`EventEmitter3`）
- [x] 自定义`import语句`顺序
- [x] 支持`CI构建`，可通过`pnpm build:prod -- --ciVersion 1.1.1`添加构建版本号
- [x] `swagger`转`ts类型文件`并自动生成`request文件`
