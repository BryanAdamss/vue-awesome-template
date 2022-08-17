/**
 * @author GuangHui
 * @description swagger 转 ts声明
 */

import fs from 'fs'
import path from 'path'

import openapiTS from 'openapi-typescript'

(async function () {
  const output = await openapiTS(
    'https://petstore.swagger.io/v2/swagger.json',
    {
      additionalProperties: true,
      immutableTypes: true,
      makePathsEnum: true,
    },
  )

  fs.writeFile(path.join(process.cwd(), 'types/swagger-api.ts'), output, (err) => {
    console.log(err)
  })
})()
