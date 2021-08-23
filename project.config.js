/**
 * @author GuangHui
 * @description 项目配置
 */

const { join } = require('path')

const SOURCE_DIR_NAME = 'src'
const VIEWS_DIR_NAME = 'views'
const ROUTE_DIR_NAME = 'routes'

const rootDir = join(__dirname, '.', SOURCE_DIR_NAME)
const routeDir = join(rootDir, ROUTE_DIR_NAME)
const viewsDir = join(rootDir, VIEWS_DIR_NAME)

module.exports = {
  rootDir,
  routeDir,
  viewsDir,
  author: 'GuangHui'
}
