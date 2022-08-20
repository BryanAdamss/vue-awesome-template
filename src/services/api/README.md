# api

> api 定义

- 按业务拆分成不同文件
- 目录结构同`views`一级目录结构保持一致
- 非`openapi-typescript`生成的请定义到`custom.ts`中
- 此目录已通过`unplugin-auto-import`自动导入，可在页面中直接使用
- `swagger-api.ts`是通过`openapi-typescript`自动生成并提供给`openapi-typescript-fetch`消费使用的`ts文件`
