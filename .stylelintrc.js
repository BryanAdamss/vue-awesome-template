module.exports = {
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-selector-bem-pattern'
  ],
  rules: {
    // 排序
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': true
      }
    ],
    // bem命名
    'plugin/selector-bem-pattern': {
      preset: 'suit',
      presetOptions: {
        namespace: 'c'
      },
      implicitComponents: ['src/**/*.vue'],
      implicitUtilities: ['src/sass/helpers/*.scss']
    },

    // 下面为格式化规则
    // 参考`[stylelint-config-sass-guidelines@6.2.0](https://github.com/bjankord/stylelint-config-sass-guidelines/releases/tag/v6.2.0)`
    // stylelint规则可查询https://stylelint.io/user-guide/rules/about
    indentation: [
      2,
      {
        message: 'Please use 2 spaces for indentation.',
        severity: 'error'
      }
    ],
    'max-nesting-depth': [
      3, // 最大嵌套深度调整为3
      {
        ignoreAtRules: ['each', 'media', 'supports', 'include']
      }
    ],
    'declaration-property-value-blacklist': null, // 关闭属性值黑名单,以允许border:none写法
    'no-missing-end-of-source-newline': true,
    'media-feature-name-no-vendor-prefix': null, // 关闭媒体特性前缀
    'selector-max-id': null, // 关闭id选择器数量限制
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'function-comma-space-after': 'always-single-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'selector-class-pattern': null, // 关闭选择器命名限制规则
    'selector-list-comma-newline-after': 'always',
    'selector-max-compound-selectors': 3,
    'selector-no-qualifying-type': true,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': null,
    'shorthand-property-no-redundant-values': null
  }
}
