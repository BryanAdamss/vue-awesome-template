/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  /* https://tailwindcss.com/docs/configuration#prefix */
  // prefix: 'c-', // 类名前缀
  /* https://tailwindcss.com/docs/configuration#important */
  // important: '#app', // 通过在所有类前添加#app提高权重
  theme: {
    extend: {},
  },
  plugins: [],
  /* 关闭或启用部分核心能力 */
  /* https://tailwindcss.com/docs/configuration#core-plugins */
  /* 禁用部分功能 */
  // corePlugins: {
  //   float: false,
  //   objectFit: false,
  // },
  /* 仅开启下述功能 */
  // corePlugins: ['margin', 'padding', 'borderRadius'],

}
