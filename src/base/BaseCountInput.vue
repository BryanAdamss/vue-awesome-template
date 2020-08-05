<template>
  <div
    :data-num="counterText"
    :class="customClazz"
    :style="customStyle"
    class="c-BaseCountInput"
    @input="handleInput"
  >
    <slot />
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
    },
    val: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
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
      return String(this.val).length
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
    const { default: field } = this.$slots

    if (
      !field ||
      !field.length ||
      !field[0].tag ||
      (field[0].tag.toLowerCase() !== 'textarea' &&
        field[0].tag.toLowerCase() !== 'input')
    ) {
      return
    }

    this.showCounter = true

    // 设置初始值
    this.$nextTick(() => {
      field[0].elm.value = this.val
    })
  },
  mounted() {},
  methods: {
    handleInput(e) {
      console.log(e)

      const val = e.target.value

      if (val.length >= this.max) {
        const limitedVal = val.slice(0, this.max)
        // this.val = limitedVal
        this.$emit('update:val', limitedVal)
        e.target.value = limitedVal

        this.setDisabled(true)

        // 派发超出事件
        this.$emit('exceed', limitedVal)
      } else {
        // this.val = val
        this.$emit('update:val', val)
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
  color: $text-color-primary;
  font-size: 14px;

  &.is-bottom {
    padding: 1.2em;
  }

  &-field {
    display: block;
  }

  &.has-counter {
    position: relative;

    &::after {
      position: absolute;

      font-size: 0.8em;

      content: attr(data-num);
    }

    &.is-bottom {
      &::after {
        right: 0.8em;
        bottom: 0;
      }
    }

    &.is-center {
      &::after {
        top: 50%;
        right: 0.8em;

        transform: translateY(-50%);
      }
    }
  }
}
</style>
