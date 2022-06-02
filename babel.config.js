module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator#loose
    // loose:true;假设document.all不存在，转义a??'default value'时，使用a!=null?a:'default value'而不是a !== null && a!=void 0 ? a:'default value'
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
    // https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining#loose
    // loose:true；同上
    ['@babel/plugin-proposal-optional-chaining', { loose: true }]
  ],
  assumptions: {
    // document.all返回的是HTMLCollection，但document.all == null 为true，此会影响nullish-coalescing-operator、optional-chaining判断，所以直接假设项目中没有使用到document.all以方便插件使用
    noDocumentAll: true
  }
}
