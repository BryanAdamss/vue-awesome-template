<script setup lang="ts">
/**
 * * SwgApiRequest
 */

const state = reactive({ resp: {} } as { resp: findPetsByStatusRet })

const res = await findPetsByStatus({
  status: ['available', 'pending'],
})

state.resp = res.data
console.log('🚦 -> file: App.vue -> line 27 -> state', state)
</script>

<template>
  <div class="c-SwgApiRequest">
    {{ state }}
  </div>
</template>
