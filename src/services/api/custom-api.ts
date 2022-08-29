/**
 * @author GuangHui
 * @description 非swagger接口定义，需自行编写，向swagger-api.ts模型靠齐
 */

export interface paths {
  '/pet': {
    put: operations['updatePetCustom'] /* operations名，如果同swagger-api一样，请添加标识区分，否则auto-import无法区分 */
    post: operations['addPetCustom']
  }
  '/pet/findByStatus': {
    /** Multiple status values can be provided with comma separated strings */
    get: operations['findPetsByStatusCustom']
  }
}

export interface operations {
  updatePetCustom: {
    parameters: {
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions['Pet']
      }
    }
    responses: {
      /** Invalid ID supplied */
      400: unknown
      /** Pet not found */
      404: unknown
      /** Validation exception */
      405: unknown
    }
  }
  addPetCustom: {
    parameters: {
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions['Pet']
      }
    }
    responses: {
      /** Invalid input */
      405: unknown
    }
  }
  /** Multiple status values can be provided with comma separated strings */
  findPetsByStatusCustom: {
    parameters: {
      query: {
        /** Status values that need to be considered for filter */
        status: ('available' | 'pending' | 'sold')[]
      }
    }
    responses: {
      /** successful operation */
      200: {
        schema: definitions['Pet'][]
      }
      /** Invalid status value */
      400: unknown
    }
  }
}

export interface definitions {
  Pet: {
    /** Format: int64 */
    id?: number
    category?: definitions['Category']
    /** @example doggie */
    name: string
    photoUrls: string[]
    tags?: definitions['Tag'][]
    /**
     * @description pet status in the store
     * @enum {string}
     */
    status?: 'available' | 'pending' | 'sold'
  }
  Category: {
    /** Format: int64 */
    id?: number
    name?: string
  }
  Tag: {
    /** Format: int64 */
    id?: number
    name?: string
  }
}
