<template>
  <div
    :data-num="counterText"
    :class="{
      'has-counter':needCounter,
      'is-disabled':isDisabled
    }"
    class="c-BaseTextArea">
    <textarea
      v-auto-height
      v-model="val"
      :style="customStyle"
      :class="customClass"
      class="c-BaseTextArea-field"
      @input="handleInput"
    />
  </div>
</template>

<script>
/**
 * * BaseTextArea
 * * 基础textarea - 支持计数(需要v-auto-height支持)、自增高
 */

export default {
  name: 'BaseTextArea',
  components: {},
  mixins: [],
  props: {
    customClass: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    needCounter: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 100
    },
    sep: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      val: '',
      isDisabled: false
    }
  },
  computed: {
    counterText() {
      return `${this.len}${this.sep}${this.max}`
    },
    len() {
      return this.val.length
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleInput(e) {
      if (this.len >= this.max) {
        this.val = this.val.slice(0, this.max)
        this.setDisabled(true)
      }
    },
    setDisabled(flag) {
      if (typeof flag !== 'boolean') return
      this.isDisabled = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseTextArea {
  @include inline-block();
  font-size: 14px;
  color: $mainTextColor;

  &-field {
    display: block;
    padding: 1em;
  }

  &.has-counter {
    position: relative;

    &::after {
      font-size: 0.8em;
      content: attr(data-num);
      position: absolute;
      right: 0.8em;
      bottom: 0;
    }
  }
}
</style>
