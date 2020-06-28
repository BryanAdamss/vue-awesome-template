<template>
  <transition
    :name="transitionName"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script>
/**
 * * router slide动画组件
 */
export default {
  name: 'BaseTransitionSlide',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  will-change: transform, opacity;
  transition: transform 0.3s, opacity 0.3s;
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}

.slide-right-enter,
.slide-left-leave-to {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
