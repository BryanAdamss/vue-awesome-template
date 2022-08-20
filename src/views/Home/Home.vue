<script setup lang="ts">
import { routesLoader } from '@/plugins/routes-loader'

const routes = routesLoader()
</script>

<template>
  <main>
    <ul>
      <li v-for="(route, path) in routes" :key="path">
        <RouterLink :to="route.path">
          {{ route.path }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
