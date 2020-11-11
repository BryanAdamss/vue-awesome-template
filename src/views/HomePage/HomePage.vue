<template>
  <div class="c-HomePage">
    <LinkList />
    <router-link
      :to="{ name: 'HomeChild1' }"
      class="c-Link"
    >
      ToHomeChild1
    </router-link>
    <router-link
      :to="{ name: 'HomeChild2' }"
      class="c-Link"
    >
      ToHomeChild2
    </router-link>
    <!-- Home子路由出口 -->
    <BaseTransitionSlide>
      <keep-alive>
        <router-view />
      </keep-alive>
    </BaseTransitionSlide>
  </div>
</template>

<script>
/**
 * * HomePage
 */

import BaseTransitionSlide from 'Base/BaseTransitionSlide'

import LinkList from 'Components/LinkList'

export default {
  // * 组件需命名，采用帕斯卡风格
  name: 'HomePage',
  components: {
    BaseTransitionSlide,
    LinkList
  }
}
</script>

<style lang="scss" scoped>
// * js中的import可以使用webpack.base中定义的路径别名
// ! sass中无法使用，必须用相对路径

// * 这里没有导入sass变量及mixin是因为通过sass-resources-loader事先导入了
.c-HomePage {
  @include bg-alpha();
}

.c-Link {
  color: blue;
  // * 被激活的router-link会自动添加上router-link-active样式类
  @at-root #{&}.router-link-active {
    text-decoration: underline;
  }
}
</style>
