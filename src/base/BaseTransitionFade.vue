<template>
  <component
    :is="type"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="fadeIn"
    leave-active-class="fadeOut"
    move-class="fade-move"
    v-on="hooks"
  >
    <slot />
  </component>
</template>

<script>
/**
 * * BaseTransitionFade
 */

export default {
  name: 'BaseTransitionFade',
  components: {},
  mixins: [],
  props: {
    duration: {
      type: Number,
      default: 300
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {}
  },
  computed: {
    type() {
      return this.group ? 'transition-group' : 'transition'
    },
    hooks() {
      return {
        beforeEnter: this.setDuration,
        afterEnter: this.cleanUpDuration,
        beforeLeave: this.setDuration,
        afterLeave: this.cleanUpDuration,
        leave: this.setAbsolutePosition,
        ...this.$listeners
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    setDuration(el) {
      el.style.animationDuration = `${this.duration}ms`
    },
    cleanUpDuration(el) {
      el.style.animationDuration = ''
    },
    setAbsolutePosition(el) {
      if (this.group) {
        el.style.position = 'absolute'
      }
    }
  }
}
</script>

<style lang="scss">
.c-BaseTransitionFade {
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fadeOut {
  animation-name: fadeOut;
}

.fade-move {
  transition: transform 0.3s ease-out;
}
</style>
