# views

> 视图层

- 按业务拆分成不同目录
- 目录内按页面路由拆分成不同文件/目录
- 入口文件名称与目录名称保持一致
- 仅当前页面使用的组件，请就近维护，放在入口文件一起，若多个则入口文件同级新建`components`目录维护

```bash
src/
  views/
    Login/
      components/           # Login、Forget页面共用业务组件
        Header.vue
      Login.vue             # 入口文件同上级目录同名

      Forget/
        components/         # Forget页面共用业务组件
          Password.vue
        Forget.vue          # 二级页面入口文件同上级目录同名
        Refind.vue
  routes/
    login.ts                # 按业务拆分
  services/
    const/
      common.ts             # 共用常量
      login.ts              # 按业务拆分，同`views`一级目录结构保持一致
    stores/
      global-state.ts
      login.ts
    api/
      common.ts
      login.ts
```
