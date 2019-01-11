<template>
  <div class="c-c-InputAutoHeightTestTest">
    <textarea v-auto-height />
  </div>

</template>

<script>
/**
 * * c-InputAutoHeightTest
 */

import AutoHeight from 'Directives/auto-height'
export default {
  name: 'CInputAutoHeightTest',
  directives: {
    AutoHeight
  }
}
</script>

<style scoped>
textarea {
  border-width: 10px;
}
</style>
