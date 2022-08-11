/**
 * @author GuangHui
 * @description tailwindcss 配置
 */

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  /* 通过切换class控制darkmode */
  /* https://tailwindcss.com/docs/dark-mode#customizing-the-class-name */
  darkMode: ['class', '.is-dark'],
  /* https://tailwindcss.com/docs/configuration#prefix */
  // prefix: 'vat-', // 类名前缀
  /* https://tailwindcss.com/docs/configuration#important */
  // important: '#app', // 通过在所有类前添加#app提高权重
  theme: {
    /* theme包含screens、colors、spacing以及core-plugin对应的key */
    /* 默认设置上述key时，执行替换操作（非合并），见下面opacity */
    /* 直接配置，将替换默认opacity配置 */
    // opacity: {
    //   0: '0',
    //   20: '0.2',
    //   40: '0.4',
    //   60: '0.6',
    //   80: '0.8',
    //   100: '1',
    // },
    /* 在原有默认配置上扩展，或者覆盖一个值，使用theme.extend */
    // extend: {
    //   screens: {
    //     /* 覆盖原有的2xl */
    //     '2xl': '1400px',
    //     /* 在原有screens配置基础上扩展3xl */
    //     '3xl': '1600px',
    //   },
    // },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'rgba(var(--vat-green),<alpha-value>)',
      secondary: 'rgba(var(--vat-blue),<alpha-value>)',
      success: 'rgba(var(--vat-green),<alpha-value>)',
      info: 'rgba(var(--vat-blue),<alpha-value>)',
      warning: 'rgba(var(--vat-yellow),<alpha-value>)',
      error: 'rgba(var(--vat-red),<alpha-value>)',
      /* 继承默认颜色 */
      ...colors,
    },
    /* 自定义opacity枚举 */
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      80: '0.8',
      90: '0.9',
      100: '1',
    },
  },
  plugins: [],
  /* 关闭或启用部分核心能力 */
  /* https://tailwindcss.com/docs/configuration#core-plugins */
  /* 禁用部分功能 */
  // corePlugins: {
  //   float: false,
  //   objectFit: false,
  //   opacity: false,
  // },
  /* 仅开启下述功能 */
  // corePlugins: ['margin', 'padding', 'borderRadius'],
  /* 不会被打包优化的样式类名 */
  // safelist: [],
}
