/**
* @author GuangHui
* @description 提供一些公共的请求方法
*/

import { getPermissionConfig } from 'Services/api/common.js'
import { apiBuilderInstance } from 'Services/extends/api-builder-instance.js'

export const getPermission = apiBuilderInstance.create(getPermissionConfig)