<template>
  <div class="c-TopBar">
    <BaseLayoutHorizontal>
      <template slot="side">
        <div
          v-show="isShowBackBtn"
          class="c-TopBar-item"
          :style="{cursor:'pointer'}"
          @click="onClickGoBack"
        >
          &lt;返回
        </div>
      </template>

      <template>
        <div
          class="c-Title"
          :title="title"
          v-text="title"
        />
      </template>

      <template slot="extra">
        <div class="c-TopBar-item" />
      </template>
    </BaseLayoutHorizontal>
  </div>
</template>

<script>
/**
 * * TopBar
 */
import BaseLayoutHorizontal from 'Base/BaseLayoutHorizontal'

export default {
  name: 'TopBar',
  components: {
    BaseLayoutHorizontal
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      isShowBackBtn: false
    }
  },
  watch: {
    // * 监听$route，如果是首页则不展示返回按钮
    // ! vue-router的组件内守卫(beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)
    // ! 只在路由组件(定义每个路由时引用的那个组件，如Home,UserCenter,VuexTest等组件)及子路由组件上生效
    // ! 在非路由组件内都无法触发，必须用watch监听$route
    $route(to, from, next) {
      this.isShowBackBtn = to.name !== 'Home'
    },
    // * 下面三个路由组件内守卫都不会被触发
    beforeRouteEnter() {
      console.log('TopBarRouteEnter')
    },
    beforeRouteUpdate() {
      console.log('TopBarEnterRouteUpdate')
    },
    beforeRouteLeave() {
      console.log('TopBarRouteLeave')
    }
  },
  methods: {
    onClickGoBack() {
      if (this.$router) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-TopBar {
  &-item {
    min-width: 4em;

    color: $text-color-primary;
  }
}

.c-Title {
  overflow: hidden;

  color: $text-color-primary;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
}
</style>
