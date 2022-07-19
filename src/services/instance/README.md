# instance

> 服务实例（胶水层、聚合层）

- 组合`plugin`或三方插件+`config`生成服务实例
- 以`xxx-instance`命名，如`router-instance.ts`、`pinia-instance.ts`
- 当默认导出一个方法且接受`vue app`实例，则会被`vite-plugin-use-modules`自动注册

```ts
// router-instance.ts

/* 默认导出实例注册方法 */
export default (app: App) => app.use(routerInstance)
```
