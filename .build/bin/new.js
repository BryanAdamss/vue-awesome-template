/**
 * @author GuangHui
 * @description 创建新包
 */

const log = console.log.bind(console)

if (!process.argv[2]) {
  log('[视图名]必填 - 请输入一个视图名!')
  process.exit(1)
}

if (!process.argv[3]) {
  log('[描述]必填 - 请输入一个视图描述!')
  process.exit(1)
}

const { pascalCase, paramCase } = require('change-case')
const globby = require('globby')

const dirs = globby.sync(['src/views'], {
  ignore: ['**/node_modules/**'],
  onlyDirectories: true,
  deep: 1
})

const viewNames = dirs.map(
  p => p.match(/(?<=\/)[^/]+$/) && p.match(/(?<=\/)[^/]+$/)[0]
)

const originalViewName = process.argv[2]
const pascalCaseViewName = pascalCase(originalViewName) // 例如：AxiosTest

if (viewNames.includes(pascalCaseViewName)) {
  log(`[${pascalCaseViewName}] 已经定义过了!`)
  process.exit(1)
}

const path = require('path')
const eol = require('os').EOL
const fileSave = require('file-save')
const render = require('json-templater/string')

const { author, routeDir, viewsDir } = require('../../project.config.js')

const paramCaseViewName = paramCase(originalViewName) // 例如：/axios-test
const desc = process.argv[3] || pascalCaseViewName
const _author = process.argv[4] || author
const debug = !!process.argv[5]

const curViewDir = path.join(viewsDir, pascalCaseViewName)

const params = {
  viewName: pascalCaseViewName,
  desc,
  author: _author,
  routePath: paramCaseViewName,
  requestFileName: paramCaseViewName
}

const tplMap = {
  route: [
    {
      tpl: require('../template/route-define.js'),
      params,
      name: path.join(routeDir, `${paramCaseViewName}.js`)
    }
  ],
  comp: [
    {
      tpl: require('../template/vue-comp.js'),
      params,
      name: path.join(curViewDir, `${pascalCaseViewName}.vue`)
    }
  ]
}

Object.entries(tplMap).forEach(([key, list]) => {
  list.forEach(({ tpl, params, name }) => {
    !debug &&
      fileSave(name)
        .write(render(tpl, params))
        .end(eol)

    debug && log(key, name)
  })
})

log('exec new.js DONE!')
