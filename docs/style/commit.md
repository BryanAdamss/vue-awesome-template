# 代码提交规范

```
[type]([scope]) - [description]
[BLANK LINE]
[body]
[BLANK LINE]
[footer]
```

对格式的说明如下：

- **type(必须)** 代表某次提交的类型，比如是修复一个 bug 还是增加一个新的 feature。所有的 type 类型如下：
  - feat： 新增 feature
  - fix: 修复 bug
  - docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
  - style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  - refactor: 代码重构，没有加新功能或者修复 bug
  - perf: 优化相关，比如提升性能、体验
  - test: 测试用例，包括单元测试、集成测试等
  - chore: 改变构建流程、或者增加依赖库、工具等
  - revert: 回滚到上一个版本
- **scope(非必须)** 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- **description(必须)** commit 目的的简短描述，不超过 50 个字符。
  - 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
  - 第一个字母小写
  - 结尾不加句号（.）
