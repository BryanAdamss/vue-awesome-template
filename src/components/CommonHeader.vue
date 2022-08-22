<script setup lang="ts">
/**
 * * CommonHeader
 */
</script>

<template>
  <header class="c-CommonHeader flex items-center ">
    <div class="flex-none w-8 p-1" @click="$router.back()">
      <div v-show="$route.path !== '/'" class="text-center hover:cursor-pointer hover:bg-gray-300">
        &lt;
      </div>
    </div>
    <div class="flex-auto p-1">
      <h1 class="text-center font-bold">
        VUE-AWESOME-TEMPLATE
      </h1>
    </div>
    <div class="flex-none p-1">
      <span>right</span>
    </div>
  </header>
</template>
