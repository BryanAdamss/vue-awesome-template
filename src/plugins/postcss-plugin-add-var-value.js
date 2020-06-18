/**
 * @author GuangHui
 * @description postcss为css var 添加降级方案的插件
 * @egs
 *
 * before:
 * color: var(--brand-primary,  #5e7ce0);
 *
 * after:
 * color: #5e7ce0;
 * color: var(--brand-primary, #5e7ce0);
 */

var postcss = require('postcss')
var cssVarReg = new RegExp('var\\(--.*?,(.*?)\\)', 'g')

module.exports = postcss.plugin(
  'postcss-plugin-add-origin-css-var-value',
  () => {
    return root => {
      root.walkDecls(decl => {
        if (
          decl.type !== 'comment' &&
          decl.value &&
          decl.value.match(cssVarReg)
        ) {
          decl.cloneBefore({
            value: decl.value.replace(cssVarReg, (...items) => items[1].trim())
          })
        }
      })
    }
  }
)
