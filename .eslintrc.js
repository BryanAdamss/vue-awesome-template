module.exports = {
  root: true,
  env: {
    node: true
  },
  // 2020-0623-改用更严格的vue eslit检查规则
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier'],
  // extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 在类成员之间出现空行
    'lines-between-class-members': 'warn',
    // 强制驼峰
    camelcase: 'off',
    // 关闭attribute强制横线连接
    'vue/attribute-hyphenation': 'off',
    // 单行内容的html标签，将内容置于一行中
    'vue/singleline-html-element-content-newline': 'warn',
    // style、template、script块间留有空格
    'vue/padding-line-between-blocks': 'warn',
    // 设置缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 关闭reject必须返回一个error
    'prefer-promise-reject-errors': 'off',
    // 允许同一个var声明多个变量
    'one-var': 'off',
    // 允许使用tab
    'no-tabs': 'off',
    // 允许函数前没有空格
    'space-before-function-paren': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // console、debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
