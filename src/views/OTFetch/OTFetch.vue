<script setup lang="ts">
/**
 * * OTFetch
 */

const { status, data: pets } = await findPetsByStatus({
  status: ['available', 'pending'],
})
console.log('🚦 -> file: App.vue -> line 27 -> status, data', status, pets)
</script>

<template>
  <div class="c-OTFetch">
    {{ status }}
    <hr>
    {{ pets }}
  </div>
</template>
