# .swagger-ts

> swagger 请求自动生成相关

- `index.mjs`拉取远程`swagger schema JSON`并生成`swagger-api.ts`文件
- `gen-req.mjs`根据`./const.mjs`中`INPUT_FILES`生成请求文件输出到`OUTPUT_DIR`中
  - 默认读取`src/services/api/**.ts`，输出到对应的`src/services/request/**-request.ts`文件中
  - 生成文件中使用的请求实例，是根据`api/`中文件名自动拼装导入的，模板为`import { fetcher } from \'@/services/instance/${baseName}-request-instance`
  - 例如
    - INPUT:`src/services/api/test.ts`
    - OUTPUT:`src/services/request/test-request.ts`
    - `test-request.ts`中请求实例将从`src/services/instance/test-request-instance.ts`导入
