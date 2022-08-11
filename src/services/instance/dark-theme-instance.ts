/**
 * @author GuangHui
 * @description tailwind深色主题实例
 */

import { DarkTheme } from '@/plugins/dark-theme'

/* 深色主题实例（单例） */
export const darkThemeInstance = new DarkTheme({ singleton: true, darkClassName: 'is-dark' })

/* 导出ThemeType枚举值 */
export { ThemeType } from '@/plugins/dark-theme'

