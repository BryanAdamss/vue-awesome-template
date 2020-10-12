module.exports = {
  root: true,
  env: {
    node: true
  },
  // 2020-0623-改用更严格的vue eslit检查规则
  extends: ['plugin:vue/recommended', '@vue/standard'],
  // extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['simple-import-sort'], // 添加import排序插件
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
    // 允许使用v-html
    'vue/no-v-html': 'off',
    // 设置缩进
    // indent: ['error', 2, { SwitchCase: 1 }],
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
    // 允许使用void 0代替undefined
    'no-void': 'off',
    // console、debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // eslint-plugin-simple-import-sort
    // 使用其自定义排序 https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],

          // 通用->具体(项目->业务)
          ['^Config'],
          ['^Plugins'],

          ['^Utils'],
          ['^Directives'],
          ['^Assets'],
          ['^Sass'],
          ['^Routes'],
          ['^Views'],

          ['^Base'],
          ['^Components'],

          ['^Services'],

          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ['^[^.]'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.']
        ]
      }
    ],
    'sort-imports': 'off', // 关闭可能影响simple-import-sort效果的自带排序规则
    'import/order': 'off' // 关闭可能影响simple-import-sort效果的自带排序规则
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
  ],
  globals: {
    // 指定全局变量并不允许改写，eslint不会报错
    katex: false,
    MathJax: false,
    Vconsole: false,
    FastClick: false,
    pdfjsLib:false,
    pdfjsViewer:false
  }
}
