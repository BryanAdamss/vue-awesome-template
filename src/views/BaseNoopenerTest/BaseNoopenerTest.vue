<template>
  <div class="c-BaseNoopenerTest">
    <BaseNoOpenerAnchor
      class="c-Anchor"
      href="http://test.abc.com"
      @click="handleClick"
    >
      <template>
        检查a标签的rel=noopener
      </template>
    </BaseNoOpenerAnchor>
  </div>
</template>

<script>
/**
 * * BaseNoopenerTest
 */

import BaseNoOpenerAnchor from 'Base/BaseNoOpenerAnchor'

export default {
  name: 'BaseNoopenerTest',
  components: {
    BaseNoOpenerAnchor
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      alert('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseNoopenerTest {
  color: red;
}
</style>
