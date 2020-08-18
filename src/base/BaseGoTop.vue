<template>
  <transition name="fade">
    <svg
      v-if="show"
      class="c-BaseGoTop"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.484 28.284"
      @click="scrollToTop"
    >
      <g transform="translate(-229 -126.358)">
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(229 151.107) rotate(-45)"
        />
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(274.949 154.642) rotate(-135)"
        />
      </g>
    </svg>
  </transition>
</template>

<script>
import { debounce } from 'Utils'

export default {
  name: 'BaseGoTop',
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      scrollTop: null
    }
  },
  computed: {
    show () {
      return this.scrollTop > this.threshold
    }
  },
  mounted () {
    this.scrollTop = this.getScrollTop()
    window.addEventListener('scroll', debounce(() => {
      this.scrollTop = this.getScrollTop()
    }, 100))
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
.c-BaseGoTop {
  position: fixed;
  // right: 2.5rem;
  bottom: 2rem;
  // 使用left修复滚动条出现时的晃动
  left: calc(100vw - 4rem);
  z-index: 1;

  width: 2rem;

  color: $theme-primary;

  cursor: pointer;

  &:hover {
    color: $theme-primary-darken;
  }
}

/* postcss-bem-linter: ignore */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

/* postcss-bem-linter: ignore */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
