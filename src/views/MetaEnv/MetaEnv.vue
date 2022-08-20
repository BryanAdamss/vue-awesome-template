<script setup lang="ts">
/**
 * * MetaEnv
 */

const env = import.meta.env
</script>

<template>
  <div class="c-MetaEnv">
    <h1 class="text-3xl ">
      <!-- 生产环境替换Vue模板里import.meta.env时， 会出现Unexpected token -->
      <!-- 使用wbr兼容 -->
      <!-- https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement -->
      import.meta<wbr>.env
    </h1>
    <div class="bg-gray-700">
      {{ env }}
    </div>
  </div>
</template>
