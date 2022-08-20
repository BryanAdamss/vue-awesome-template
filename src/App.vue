<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'

/* useGlobalState is auto import with  unplugin-auto-import */
const globalState = useGlobalState()
</script>

<template>
  <CommonHeader />
  <hr>
  globalState:{{ globalState }}
  <hr>

  <!-- 异步组件配合使用必须采用下述嵌套层级 -->
  <!-- https://staging-cn.vuejs.org/guide/built-ins/suspense.html#combining-with-other-components -->
  <!-- https://github.com/vuejs/core/issues/2143#issuecomment-694640896 -->
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <!-- <KeepAlive> -->
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component" />

          <!-- 加载中状态 -->
          <template #fallback>
            正在加载...
          </template>
        </Suspense>
        <!-- </KeepAlive> -->
      </Transition>
    </template>
  </RouterView>
</template>
