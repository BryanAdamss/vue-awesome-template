<template>
  <div class="c-CircleProgress">

    <BaseCircleProgress
      :progress="progress"
      :progressOption="baseCircleProgressOption"/>

    <div
      :style="styleObj"
      class="c-CircleProgress-bd">

      <slot>
        <h2
          :title="text"
          class="c-CircleProgress-text"
          v-text="text"/>

        <p
          v-if="info"
          :title="info"
          class="c-CircleProgress-info"
          v-text="info"/>
      </slot>

    </div>

  </div>
</template>

<script>
/**
 * * CircleProgress
 * * 圆形进度条
 */

import BaseCircleProgress from 'Base/BaseCircleProgress'

export default {
  name: 'CircleProgress',
  components: {
    BaseCircleProgress
  },
  mixins: [],
  props: {
    progress: {
      type: Number,
      required: true,
      validator(val) {
        return val >= 0 && val <= 1
      }
    },
    text: {
      type: String,
      default() {
        return `${this.progress * 100}%`
      }
    },
    info: {
      type: String,
      default: ''
    },
    radius: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 20
    },
    backColor: {
      type: String,
      default: '#e6e6e6'
    },
    startColor: {
      type: Array,
      validator(val) {
        return val.length === 3
      },
      default() {
        return [249, 221, 180]
      }
    },
    endColor: {
      type: Array,
      validator(val) {
        return val.length === 3
      },
      default() {
        return [238, 171, 86]
      }
    },
    duration: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {}
  },
  computed: {
    styleObj() {
      return {
        'max-width': `${this.radius * 2 - this.strokeWidth * 2}px`
      }
    },
    baseCircleProgressOption() {
      return {
        radius: this.radius,
        strokeWidth: this.strokeWidth,
        backColor: this.backColor,
        startColor: this.startColor,
        endColor: this.endColor,
        duration: `${this.duration}s`,
        step: this.step
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-CircleProgress {
  position: relative;

  display: inline-block;

  &-bd {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 70%;

    transform: translate3d(-50%, -50%, 0);
  }

  &-text {
    max-width: 100%;
    margin: 0;
    overflow: hidden;

    color: $mainTextColor;
    font-weight: bold;
    font-size: 24px;

    line-height: 1.2em;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }

  &-info {
    max-width: 100%;

    margin: 0;
    overflow: hidden;

    color: #ccc;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
}
</style>
