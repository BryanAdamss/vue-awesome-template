<script setup lang="ts">
/**
 * * CustomApiRequest
 */

const status = reactive({ resp: {} } as { resp: findPetsByStatusCustomRet })

const handleClick = async () => {
  const res = await findPetsByStatusCustom({
    status: ['available'],
  })
  status.resp = res.data
}
</script>

<template>
  <div class="c-CustomApiRequest">
    <div @click="handleClick">
      getPetByStatus use CustomApiRequest
    </div>
    <hr>
    {{ status }}
  </div>
</template>
