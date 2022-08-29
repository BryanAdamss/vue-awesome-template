<script setup lang="ts">
/**
 * * CustomApiRequest
 */

import type { FetchReturnType } from 'openapi-typescript-fetch'

const data = reactive({ p: [] } as { p: FetchReturnType<typeof findPetsByStatusCustom> })

const handleClick = async () => {
  const { data: pets } = await findPetsByStatusCustom({
    status: ['pending'],
  })
  data.p = pets
}
</script>

<template>
  <div class="c-CustomApiRequest">
    <div @click="handleClick">
      getPetByStatus use CustomApiRequest
    </div>
    <hr>
    {{ data }}
  </div>
</template>
