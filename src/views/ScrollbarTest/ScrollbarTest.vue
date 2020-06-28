<template>
  <div class="c-ScrollbarTest">
    <BaseScrollbar>
      <ul
        class="c-List"
        style="width:400px;"
      >
        <li class="c-List-item">
          1
        </li>
        <li class="c-List-item">
          2
        </li>
        <li class="c-List-item">
          3
        </li>
        <li class="c-List-item">
          4
        </li>
        <li class="c-List-item">
          5
        </li>
        <li class="c-List-item">
          6
        </li>
        <li class="c-List-item">
          7
        </li>
        <li class="c-List-item">
          8
        </li>
        <li class="c-List-item">
          9
        </li>
        <li class="c-List-item">
          10
        </li>
        <li class="c-List-item">
          11
        </li>
        <li class="c-List-item">
          12
        </li>
        <li class="c-List-item">
          13
        </li>
        <li class="c-List-item">
          14
        </li>
        <li class="c-List-item">
          15
        </li>
        <li class="c-List-item">
          16
        </li>
        <li class="c-List-item">
          17
        </li>
        <li class="c-List-item">
          18
        </li>
        <li class="c-List-item">
          19
        </li>
        <li class="c-List-item">
          20
        </li>
      </ul>
    </BaseScrollbar>
  </div>
</template>

<script>
/**
 * * ScrollbarTest
 */

import BaseScrollbar from 'Base/BaseScrollbar'

export default {
  name: 'ScrollbarTest',
  components: {
    BaseScrollbar
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-ScrollbarTest {
  width: 300px;
  height: 300px;
}
</style>
