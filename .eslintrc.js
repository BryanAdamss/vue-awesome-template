// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    // 关闭attribute强制横线连接
    'vue/attribute-hyphenation': 'off',
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
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    // 指定全局变量并不允许改写，eslint不会报错
    katex: false,
    MathJax: false,
    Vconsole: false,
    FastClick: false
  }
}
