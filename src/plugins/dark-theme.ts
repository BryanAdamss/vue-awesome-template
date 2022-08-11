/**
 * @author GuangHui
 * @description 深色主题
 */

export enum ThemeType {
  OS = 'os', /* 跟随系统 */
  MANUAL_DARK = 'manual-dark', /* 手动设置为深色 */
  MANUAL_LIGHT = 'manual-light', /* 手动设置为亮色 */
}

interface Opts {
  darkClassName?: string
  themeType?: ThemeType
  singleton?: boolean
}

export class DarkTheme {
  static _instance: DarkTheme | undefined
  darkClassName: string

  constructor(
    {
      darkClassName = 'dark',
      singleton = false,
    }: Opts = {},
  ) {
    this.darkClassName = darkClassName

    return singleton && DarkTheme._instance
      ? DarkTheme._instance
      : (DarkTheme._instance = this)
  }

  private prefersScheme(colorScheme: 'light' | 'dark') {
    return window.matchMedia(`(prefers-color-scheme: ${colorScheme})`).matches
  }

  private isPrefersDark() {
    return this.prefersScheme('dark')
  }

  private addDarkClassName() {
    document.documentElement.classList.add(this.darkClassName)
  }

  private removeDarkClassName() {
    document.documentElement.classList.remove(this.darkClassName)
  }

  private followOs() {
    if (this.isPrefersDark())
      this.addDarkClassName()
    else
      this.removeDarkClassName()
  }

  setTheme(type: ThemeType) {
    switch (type) {
      case ThemeType.OS:
        this.followOs()
        break
      case ThemeType.MANUAL_DARK:
        this.addDarkClassName()
        break
      default:
        this.removeDarkClassName()
        break
    }
  }
}
