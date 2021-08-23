/**
 * @author GuangHui
 * @description 路由定义模板
 */

module.exports = `/**
* @author {{author}}
* @description {{desc}}
*/

const {{viewName}} = () =>
  import(
    /* webpackChunkName:'{{viewName}}' */ 'Views/{{viewName}}/{{viewName}}.vue'
  )

export const {{viewName}}RouteConfig = [
  {
    path: '/{{routePath}}',
    name: '{{viewName}}',
    component: {{viewName}},
  }
]
`
