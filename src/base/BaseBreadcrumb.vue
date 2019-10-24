<template>

  <div
    v-if="routeList && routeList.length"
    :class="customClass"
    :style="customStyle"
    class="c-BaseBreadcrumb">

    <slot
      v-bind="{ needHomeIcon,homeIconClassName,homeText,homePath }"
      name="home">

      <!-- 首页 -->
      <template v-if="needHome">

        <BaseBreadcrumbItem
          :needIcon="needHomeIcon"
          :iconClassName="homeIconClassName"
          :sep="sep"
          :text="homeText"
          @itemClick="hadleHomeClick"
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
            :sep="sep"
            :text="route.text"
            @itemClick="$router.go(route.step)"
          />

        </template>
        <!-- 传入step end -->

        <!-- 传入name、path -->
        <template v-else-if="route.name || route.path">

          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :sep="sep"
            :text="route.text"
            @itemClick="$router.push(route)"
          />

        </template>
        <!-- 传入name、path end -->

        <!-- 传入href -->
        <template v-else-if="route.href">

          <BaseBreadcrumbItem
            :needIcon="route.needIcon"
            :iconClassName="route.iconClassName"
            :needSep="index !== routeList.length - 1"
            :sep="sep"
            :text="route.text"
            @itemClick="$win.location.href = route.href"
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
            :sep="sep"
            :text="route.text"
          />

        </template>
        <!-- 纯文本 end-->

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
    needHome: {
      type: Boolean,
      default: true
    },
    homeRouteName: {
      type: String,
      default: ''
    },
    homeRoutePath: {
      type: String,
      default: ''
    },
    homePath: {
      type: String,
      default: '/'
    },
    homeText: {
      type: String,
      default: '首页'
    },
    needHomeIcon: {
      type: Boolean,
      default: false
    },
    homeIconClassName: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    sep: {
      type: String,
      default: '❯'
    },
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
    handleHomeClick() {
      if (this.homeRouteName) {
        this.$router && this.$router.push({name: this.homeRouteName})
      } else if (this.homeRoutePath) {
        this.$router && this.$router.push({path: this.homeRoutePath})
      } else if (this.homePath) {
        this.$win.location.href = this.homePath
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseBreadcrumb {
  font-size: 12px;
  color: #999;

  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
