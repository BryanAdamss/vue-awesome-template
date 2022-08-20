<script setup lang="ts">
/**
 * * DarkTheme
 */

import { ThemeType, darkThemeInstance } from '@/services/instance/dark-theme-instance'
</script>

<template>
  <div class="DarkTheme">
    <h1>主题</h1>
    <ul>
      <li>
        <button type="button" @click="darkThemeInstance.setTheme(ThemeType.OS)">
          跟随系统
        </button>
      </li>
      <li>
        <button type="button" @click="darkThemeInstance.setTheme(ThemeType.MANUAL_DARK)">
          dark
        </button>
      </li>
      <li>
        <button type="button" @click="darkThemeInstance.setTheme(ThemeType.MANUAL_LIGHT)">
          light
        </button>
      </li>
    </ul>

    <div class="bg-red-50 dark:bg-slate-400">
      我会变色
    </div>
  </div>
</template>
