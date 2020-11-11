<template>
  <component
    :is="tag"
    class="c-BaseDynamicCursor"
  >
    <template v-for="(item,index) in list">
      <component
        :is="itemTag"
        :key=" item.id || index "
        :class="[`is-${pos}`, isActive(item)]"
        class="c-BaseDynamicCursor-item"
        @click="$emit('cursor-click',item,index)"
      >
        <slot v-bind="{item,index}">
          {{ item.text || item }}
        </slot>

        <span
          :style="cursorStyleObj"
          class="c-BaseDynamicCursor-cursor"
        />
      </component>
    </template>
  </component>
</template>

<script>
/**
 * * BaseDynamicCursor
 * * 基础动态游标
 */

export default {
  name: 'BaseDynamicCursor',
  components: {},
  mixins: [],
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    itemTag: {
      type: String,
      default: 'span'
    },
    activeId: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    size: {
      type: [String, Number],
      default: 2
    },
    color: {
      type: String,
      default: 'blue'
    },
    type: {
      type: String,
      default: 'solid'
    },
    pos: {
      type: String,
      default: 'bottom',
      validator(val) {
        return ['top', 'right', 'bottom', 'left'].indexOf(val) > -1
      }
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    cursorStyleObj() {
      const w = typeof this.size === 'number' ? `${this.size}px` : this.size
      return {
        [`border-${this.pos}`]: `${w} ${this.type} ${this.color}`,
        [this.pos]: typeof this.offset === 'number' ? `${this.offset}px` : this.offset
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    isActive(item) {
      return this.activeId === item.id || this.activeId === item.text || this.activeId === item ? 'is-active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseDynamicCursor {
  &-item {
    position: relative;

    &.is-top,
    &.is-bottom {
      .c-BaseDynamicCursor-cursor {
        bottom: 0;
        left: 100%;

        width: 0;
      }

      &:hover .c-BaseDynamicCursor-cursor,
      &.is-active .c-BaseDynamicCursor-cursor {
        left: 0;

        width: 100%;

        transition-delay: 0.1s;
      }

      &:hover ~ & {
        .c-BaseDynamicCursor-cursor {
          left: 0;
        }
      }
    }

    &.is-left,
    &.is-right {
      .c-BaseDynamicCursor-cursor {
        top: 100%;
        left: 0;

        width: 100%;
        height: 0;
      }

      &:hover .c-BaseDynamicCursor-cursor,
      &.is-active .c-BaseDynamicCursor-cursor {
        top: 0;

        height: 100%;

        transition-delay: 0.1s;
      }

      &:hover ~ & {
        .c-BaseDynamicCursor-cursor {
          top: 0;
        }
      }
    }

    .c-BaseDynamicCursor-cursor {
      position: absolute;

      transition: 0.3s all linear;

      content: '';
    }
  }
}
</style>
