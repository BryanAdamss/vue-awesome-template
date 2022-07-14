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

- 分包优化
- gzip
- html 压缩
- svg
- 目录分层
