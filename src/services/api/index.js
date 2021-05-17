/**
 * @author GuangHui
 * @description 接口入口
 */

import { importAll } from "Plugins/import-all"

const apis = importAll(
  require.context('./', false, /^(?!\.\/index\b).*\.js$/)
)

const apiMap ={}

apis && apis.length && apis.forEach(({camelModuleName, module}) => {
	apiMap[camelModuleName] = module
})

export default apiMap
