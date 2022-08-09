/**
 * @author GuangHui
 * @description eslint配置，继承@antfu/eslint-config
 */

module.exports = {
  root: true,
  extends: '@antfu',
  plugins: ['import'],
  rules: {
    'no-console': 'off',
    /* eslint-plugin-import */
    'import/order': [
      'warn',
      {
        'groups': [
          'type', /* ts、flow专有，import type {} from 'xxx' */
          'builtin', /* node内置 */
          'external', /* 外部npm模块 */
          'internal', /* 内部模块，一般为webpack alias目录模块 */
          'parent', /* 父级目录 ../ */
          'sibling', /* 相邻陌路 ./ */
          'index', /* index导入 */
          'object', /* ts专有，import log = console.log */
        ],
        'pathGroups': [
          /* @/归为internal组 */
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always', /* 组间强制空行 */
        /* 组内字母排序规则 */
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/display-name': 'off',
  },
}
