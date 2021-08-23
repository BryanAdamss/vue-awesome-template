/**
 * @author GuangHui
 * @description 文章相关请求
 */

 import { getPostConfing } from 'Services/api/post.js'
 import { apiBuilderInstance } from 'Services/extends/api-builder-instance.js'
 
 export const getPost = apiBuilderInstance.create(getPostConfing)
