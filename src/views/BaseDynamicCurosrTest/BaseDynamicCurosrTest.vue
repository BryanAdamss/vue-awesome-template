<template>
  <div class="c-BaseDynamicCursorTest">
    <p>水平</p>
    <BaseDynamicCursor :list="tabs" />
    <hr>
    <p>垂直</p>
    <BaseDynamicCursor
      :list="tabs"
      itemTag="div"
      pos="right"
    />
    <hr>
    <p>自定义</p>
    <BaseDynamicCursor
      :list="tabs"
      :size="4"
      :offset="10"
      itemTag="div"
      color="#f00"
      pos="left"
    >
      <template v-slot="item">
        <p style="padding-left:20px;">
          {{ item }}
        </p>
      </template>
    </BaseDynamicCursor>
  </div>
</template>

<script>
/**
 * * BaseDynamicCursorTest
 */

import BaseDynamicCursor from 'Base/BaseDynamicCursor'

export default {
  name: 'BaseDynamicCursorTest',
  components: {
    BaseDynamicCursor
  },
  mixins: [],
  props: {},
  data() {
    return {
      tabs: [
        '游标1',
        '游标22',
        '游标333',
        '游标4444',
        '游标55555555'
      ]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-BaseDynamicCursorTest {
}
</style>
