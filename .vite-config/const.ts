/**
 * @author GuangHui
 * @description 构建常量
 */

/* 打包输出目录 */
export const OUTPUT_DIR = 'dist'

/* 资源输出目录 */
export const ASSETS_DIR = 'assets'

/* 视图目录 */
export const VIEWS_DIR = 'views'

/* ciVersion传参key */
export const CI_VERSION_KEY = '--ciVersion'

/**
 * 根据ciVersion确定assetsDir最终值
 *
 * @date 2022-07-14 20:34:38
 * @export
 * @return {string}  {(string | typeof ASSETS_DIR)}
 */
export function getAssetsDir(): string | typeof ASSETS_DIR {
  const index = process.argv?.findIndex(arg => arg === CI_VERSION_KEY)

  if (index == null || index === -1)
    return ASSETS_DIR

  const ciVersion = process.argv[index + 1]
  console.log('🚦 -> file: const.ts -> line 29 -> getAssetsDir -> ciVersion', ciVersion)

  return ciVersion ?? ASSETS_DIR
}
