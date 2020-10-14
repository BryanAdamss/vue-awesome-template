<template>
  <BaseLayoutVertical class="c-App">
    <TopBar
      slot="header"
      :title="title"
    />

    <BaseTransitionSlide>
      <!-- 因为自定义指令clickOutside在document上绑定了点击事件,会在指令的unbind时移除事件 -->
      <!-- 但是因为keep-alive会缓存组件，导致指令unbind不会触发，所以这里keep-alive需要排除ClickOutsideTest组件，强行让其触发unbind -->
      <keep-alive :exclude="exclude">
        <router-view />
      </keep-alive>
    </BaseTransitionSlide>
  </BaseLayoutVertical>
</template>

<script>
/**
 * * App
 */
import { LOADING_DEFAULT_CONFIG } from 'Config'

import BaseLayoutVertical from 'Base/BaseLayoutVertical'
import BaseTransitionSlide from 'Base/BaseTransitionSlide'

import TopBar from 'Components/TopBar'

import * as commonConst from 'Services/const/common'

export default {
  name: 'App',
  components: {
    TopBar,
    BaseLayoutVertical,
    BaseTransitionSlide
  },
  // * 提供公用常量
  provide: commonConst,
  data() {
    return {
      title: '',
      exclude: ['ClickOutsideTest', 'AffixTest', 'BasePdfViewerTest']
    }
  },
  watch: {
    // * 观测route动态修改TopBar的title
    $route: {
      handler(to, form, next) {
        if (to.meta && to.meta.title) {
          this.title = to.meta.title
        }
      },
      immediate: true
    }
  },

  created() {
    this.bindBusEvents()
    this.$once('hook:beforeDestroy', this.unbindBusEvents)
  },
  methods: {
    bindBusEvents() {
      // 接口报错弹窗
      this.$bus.$on('business.response.incorrect', msg => {
        // 接口返回code不为200时默认弹窗
        if (!msg) return
        this.$message(msg)
      })

      // 展示loading
      this.$bus.$on('global.loading.show', config => {
        if (!this.loading) {
          this.loading = this.$loading(Object.assign({}, LOADING_DEFAULT_CONFIG, config))
        }
      })

      // 隐藏loading
      this.$bus.$on('global.loading.hide', () => {
        if (this.loading) {
          this.loading.close()
          this.loading = null
        }
      })
    },
    unbindBusEvents() {
      this.$bus && this.$bus.$off()
    }
  }
}
</script>

<!--全局公用样式-->
<style lang="scss" src="Sass/common-m.scss"></style>
