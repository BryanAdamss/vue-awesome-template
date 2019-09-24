<template>
  <div
    :data-num="counterText"
    :class="customClazz"
    :style="customStyle"
    class="c-BaseCountInput"
    @input="handleInput">
    <slot/>
  </div>
</template>

<script>
/**
 * * BaseCountInput
 * * 基础计数表单
 */

export default {
  name: 'BaseCountInput',
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
    max: {
      type: Number,
      default: 100
    },
    sep: {
      type: String,
      default: '/'
    },
    pos: {
      type: String,
      validator(val) {
        return ['bottom', 'center'].indexOf(val) > -1
      },
      default: 'bottom'
    }
  },
  data() {
    return {
      val: '',
      isDisabled: false,
      showCounter: false
    }
  },
  computed: {
    customClazz() {
      return {
        ...this.customClass,
        'is-disabled': this.isDisabled,
        'is-bottom': this.pos === 'bottom',
        'is-center': this.pos === 'center',
        'has-counter': this.showCounter
      }
    },
    counterText() {
      return `${this.len}${this.sep}${this.max}`
    },
    len() {
      return this.val.length
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
    const {default: field} = this.$slots

    if (!field || !field.length || !field[0].tag || (field[0].tag.toLowerCase() !== 'textarea' && field[0].tag.toLowerCase() !== 'input')) {
      this.$slots.default = '不支持此类型输入域'
    } else {
      this.showCounter = true
    }
  },
  mounted() {},
  methods: {
    handleInput(e) {
      const val = e.target.value

      if (val.length >= this.max) {
        const limitedVal = val.slice(0, this.max)
        this.val = limitedVal
        e.target.value = limitedVal

        this.setDisabled(true)

        // 派发超出事件
        this.$emit('exceed', limitedVal)
      } else {
        this.val = val
        this.setDisabled(false)
      }
    },
    setDisabled(flag) {
      this.isDisabled = !!flag
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseCountInput {
  @include inline-block();
  font-size: 14px;
  color: $mainTextColor;

  &.is-bottom {
    padding: 1.2em;
  }

  &-field {
    display: block;
  }

  &.has-counter {
    position: relative;

    &::after {
      font-size: 0.8em;
      content: attr(data-num);
      position: absolute;
    }

    &.is-bottom {
      &::after {
        right: 0.8em;
        bottom: 0;
      }
    }

    &.is-center {
      &::after {
        right: 0.2em;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
