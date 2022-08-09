/**
 * @author GuangHui
 * @description 工具方法
 */

import { readWantedLockfile } from '@pnpm/lockfile-file'
import { nameVerFromPkgSnapshot } from '@pnpm/lockfile-utils'
import lockfileWalker from '@pnpm/lockfile-walker'

import { ASSETS_DIR, CI_VERSION_KEY } from './const'

export interface ProdDepsMap {
  [depName: string]: string
}

export interface ManualChunksMap {
  [chunkAlias: string]: string[]
}

/**
 * 获取生产环境依赖和最终版本的的map
 *
 * @date 2022-07-20 17:37:51
 * @export
 * @return {*}  {Promise<ProdDepsMap>}
 * @example
 * { pinia: '2.0.14', vue: '3.2.37', 'vue-router': '4.1.1' }
 */
export async function getProdDepsLockVersionMap(): Promise<ProdDepsMap> {
  /* 读取当前目录pnpm-lock.yml */
  const lockfile = await readWantedLockfile('./', {
    ignoreIncompatible: false,
  })

  if (!lockfile || !lockfile.packages)
    return {}

  /* 获取生产依赖 */
  const { directDeps } = lockfileWalker(
    lockfile,
    ['.'],
    /* 仅遍历生产依赖 */
    { include: { dependencies: true, devDependencies: false, optionalDependencies: false } },
  )

  /* 遍历，生成生成依赖包名和最终版本的map */
  const depsVerMap = directDeps.reduce((acc, { depPath }) => {
    if (!lockfile.packages![depPath])
      return acc

    const { name, version } = nameVerFromPkgSnapshot(depPath, lockfile.packages![depPath])

    if (!name || !version)
      return acc

    acc[name] = version
    return acc
  }, {} as ProdDepsMap)

  return depsVerMap
}

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

/**
 * 获取rollupOptions.output.manualChunksMap
 *
 * @date 2022-07-20 18:07:51
 * @export
 * @return {*}  {Promise<ManualChunksMap>}
 * @example
 * prodDepsMap
 * { pinia: '2.0.14', vue: '3.2.37', 'vue-router': '4.1.1' }
 * manualChunksMap
 * { "pinia-2.0.14": ["pinia"], "vue-3.2.37": ["vue"], "vue-router-4.1.1": ["vue-router"] }
 */
export async function getManualChunksMap(): Promise<ManualChunksMap> {
  const prodDepsMap = await getProdDepsLockVersionMap()

  return Object.entries(prodDepsMap || {})
    .reduce(
      (acc, [depName, version]) => {
        acc[`${depName}-${version}`] = [depName]
        return acc
      },
      {} as ManualChunksMap,
    )
}
