/**
  * This file was auto-generated by .swagger-ts/gen-request.mjs.
  * Do not make direct changes to the file.
  * Please change src/services/api/custom-api.ts, then regenerate it.
  */

import { fetcher } from '@/services/instance/custom-api-request-instance'

export const updatePetCustom = fetcher.path('/pet').method('put').create()

export const addPetCustom = fetcher.path('/pet').method('post').create()

export const findPetsByStatusCustom = fetcher.path('/pet/findByStatus').method('get').create()
