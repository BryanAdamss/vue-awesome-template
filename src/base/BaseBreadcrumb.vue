<template>
  <div
    v-if="routeList && routeList.length"
    :class="customClass"
    :style="customStyle"
    class="c-BaseBreadcrumb"
  >
    <slot
      v-bind="{ needHome,homeRoute }"
      name="home"
    >
      <!-- 首页 -->
      <template v-if="needHome">
        <BaseBreadcrumbItem
          :isLink="!!homeRoute.isLink"
          :needIcon="!!homeRoute.needIcon"
          :iconClassName="homeRoute.iconClassName"
          :needSep="!!(routeList && routeList.length)"
          :sep="homeRoute.sep || globalSep"
          :sepIconClassName=" homeRoute.sepIconClassName || globalSepIconClassName"
          :text="homeRoute.text"
          @item-click="handleHomeClick(homeRoute)"
        />
      </template>
      <!-- 首页 end -->
    </slot>

    <template v-for="(route,index) in routeList">
      <slot v-bind="route">
        <!-- 传入step -->
        <template v-if="route.step">
          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :sep="route.sep || globalSep"
            :sepIconClassName=" route.sepIconClassName || globalSepIconClassName"
            :text="route.text"
            @item-click="$router.go(route.step)"
          />
        </template>
        <!-- 传入step end -->

        <!-- 传入name、path -->
        <template v-else-if="route.name || route.path">
          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :sep="route.sep || globalSep"
            :sepIconClassName=" route.sepIconClassName || globalSepIconClassName"
            :text="route.text"
            @item-click="$router.push(route)"
          />
        </template>
        <!-- 传入name、path end -->

        <!-- 传入href -->
        <template v-else-if="route.href">
          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :sep="route.sep || globalSep"
            :sepIconClassName=" route.sepIconClassName || globalSepIconClassName"
            :text="route.text"
            @item-click="$win.location.href = route.href"
          />
        </template>
        <!-- 传入href end -->

        <!-- 纯文本 -->
        <template v-else>
          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :isLink="false"
            :sep="route.sep || globalSep"
            :sepIconClassName=" route.sepIconClassName || globalSepIconClassName"
            :text="route.text"
          />
        </template>
        <!-- 纯文本 end -->
      </slot>
    </template>
  </div>
</template>

<script>
/**
 * * BaseBreadcrumb
 * * 基础面包屑导航
 */

import BaseBreadcrumbItem from 'Base/BaseBreadcrumbItem'

export default {
  name: 'BaseBreadcrumb',
  components: {
    BaseBreadcrumbItem
  },
  mixins: [],
  props: {
    // 是否需要首页
    needHome: {
      type: Boolean,
      default: true
    },
    // 首页路由
    homeRoute: {
      type: Object,
      default() {
        return {
          isLink: true, // 是否是链接
          needIcon: true, // 是否展示图标
          iconClassName: '', // 图标class
          text: '首页', // 文案
          href: '/', // window.location跳转地址
          step: null, // $router.go 跳转步数

          name: '', // 路由名
          path: ''// 路由path
        }
      }
    },
    // 自定义样式类
    customClass: {
      type: String,
      default: ''
    },
    // 自定义样式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 分隔符优先级
    // route.sep > route.sepIconClassName > globalSep > globalSepIconClassName
    // 全局字符型分隔符
    globalSep: {
      type: String,
      default: '❯'
    },
    // 全局图标字体分隔符样式类
    globalSepIconClassName: {
      type: String,
      default: ''
    },
    // 其他路由列表
    routeList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 处理home点击
     */
    handleHomeClick(homeRoute) {
      const { name, path, href, step } = homeRoute
      if (typeof step === 'number' && !isNaN(step)) {
        this.$router && this.$router.go(step)
      } else if (name || path) {
        this.$router && this.$router.push(homeRoute)
      } else if (href) {
        this.$win.location.href = href
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseBreadcrumb {
  padding-top: 1em;
  padding-bottom: 1em;

  color: #999;
  font-size: 12px;
}
</style>
