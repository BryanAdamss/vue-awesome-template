/**
 * @author GuangHui
 * @description openapiTS（swagger schema->dts）
 * @docs https://github.com/drwpow/openapi-typescript
 */

import fs from 'fs'
import path from 'path'

import openapiTS from 'openapi-typescript'

import { SWAGGER_API_FILE_PATH } from './const.mjs';

(async function () {
  const content = await openapiTS(
    'https://petstore.swagger.io/v2/swagger.json',
    {
      additionalProperties: false,
      immutableTypes: false,
      makePathsEnum: false,
      pathParamsAsTypes: false,
    },
  )

  const outputFilePath = path.join(process.cwd(), SWAGGER_API_FILE_PATH)

  fs.writeFile(
    outputFilePath,
    content,
    (err) => {
      err && console.log(err)

      console.log(`${outputFilePath} generated.`)
    })
})()
