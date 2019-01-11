<template>
  <BaseLayoutVertical class="c-App">
    <TopBar
      slot="header"
      :title="title"
    />

    <BaseTransitionSlide>
      <!-- 因为自定义指令clickOutside在document上绑定了点击事件,会在指令的unbind时移除事件 -->
      <!-- 但是因为keep-alive会缓存组件，导致指令unbind不会触发，所以这里keep-alive需要排除ClickOutsideTest组件，强行让其触发unbind -->
      <keep-alive exclude="ClickOutsideTest">
        <router-view />
      </keep-alive>
    </BaseTransitionSlide>

  </BaseLayoutVertical>
</template>

<script>
/**
 * * App
 */
import BaseTransitionSlide from 'Base/BaseTransitionSlide'
import BaseLayoutVertical from 'Base/BaseLayoutVertical'

import TopBar from 'Components/TopBar'

export default {
  name: 'App',
  components: {
    TopBar,
    BaseLayoutVertical,
    BaseTransitionSlide
  },
  data() {
    return {
      title: ''
    }
  },
  watch: {
    // * 观测route动态修改TopBar的title
    $route(to, form, next) {
      if (to.meta && to.meta.title) {
        this.title = to.meta.title
      }
    }
  }
}
</script>

<!--全局公用样式-->
<style lang="scss" src="Sass/common-m.scss"></style>
