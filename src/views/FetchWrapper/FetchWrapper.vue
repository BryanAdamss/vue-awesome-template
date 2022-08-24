<script setup lang="ts">
/**
 * * FetchWrapper
 */

const data = reactive({ res: null })

const handleClick = async () => {
  data.res = await getPetByStatus({
    status: ['pending'],
  })

  console.log(data.res)
}
</script>

<template>
  <div class="c-FetchWrapper">
    <div @click="handleClick">
      getPetByStatus use FetchWrapper
    </div>
    <hr>
    {{ data }}
  </div>
</template>
