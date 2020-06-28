<template>
  <div class="c-ClickAreaExpandTest">
    <BaseClickAreaExpand
      class="c-MyBtn"
      tag="div"
      @click="onClick"
    >
      我的点击范围被扩大啦
    </BaseClickAreaExpand>
  </div>
</template>

<script>
/**
 * * ClickAreaExpandTest
 */

import BaseClickAreaExpand from 'Base/BaseClickAreaExpand'

export default {
  name: 'ClickAreaExpandTest',
  components: {
    BaseClickAreaExpand
  },
  methods: {
    onClick() {
      alert('我的点击范围被扩大啦')
    }
  }
}
</script>

<style scoped>
.c-MyBtn {
  color: red;
  margin-top: 50px;
  cursor: pointer;
}
</style>
