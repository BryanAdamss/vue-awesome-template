<template>
  <div class="c-CircleProgressTest">
    <CircleProgress
      :progress="0.8"
      :radius="67"
      :strokeWidth="8"
      :startColor="[51, 163, 238]"
      :endColor="[51, 163, 238]"
      text="80%"
      info="比率"
    />

    <CircleProgress
      :progress="0.6"
      :radius="67"
      :strokeWidth="8"
      :startColor="[5, 193, 174]"
      :endColor="[5, 193, 174]"
      text="60%"
      info="自定义文案"
    >
      <template>
        <div class="c-Info">
          <p class="c-Info-main" v-text="`60%`" />

          <div class="c-Info-sub">
            <div class="c-Info-text">
              自定义文案
            </div>
          </div>
        </div>
      </template>
    </CircleProgress>
  </div>
</template>

<script>
/**
 * * CircleProgressTest
 */

import CircleProgress from 'Components/CircleProgress'

export default {
  name: 'CircleProgressTest',
  components: {
    CircleProgress
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
.c-CircleProgressTest {
}

.c-Info {
  color: #ccc;
  font-size: 14px;
  text-align: center;

  &-main {
    margin: 0;

    color: $text-color-primary;
    font-weight: bold;
    font-size: 24px;

    line-height: 1.2em;
  }

  &-text {
    margin-bottom: -4px;
  }
}
</style>
