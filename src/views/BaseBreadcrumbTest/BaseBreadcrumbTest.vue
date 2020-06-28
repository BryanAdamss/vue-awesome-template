<template>
  <div class="c-BaseBreadcrumbTest">
    <BaseBreadcrumb
      :needHome="true"
      :homeRoute="homeRoute"
      :globalSep="'/'"
      :routeList="routeList"
    />

    <hr>
    <p>使用slot-scope 自定义样式</p>

    <BaseBreadcrumb
      :needHome="true"
      :homeRoute="homeRoute"
      :routeList="routeList"
    >
      <template
        v-slot:home="{ needHome }"
      >
        <p>home</p>
        {{ needHome }}
        {{ homeRoute }}
        <hr>
      </template>

      <template v-slot="route">
        <p>routeItem:</p>

        {{ route }}
      </template>
    </BaseBreadcrumb>
  </div>
</template>

<script>
/**
 * * BaseBreadcrumbTest
 */

import BaseBreadcrumb from 'Base/BaseBreadcrumb'

export default {
  name: 'BaseBreadcrumbTest',
  components: {
    BaseBreadcrumb
  },
  mixins: [],
  props: {},
  data() {
    return {
      homeRoute: {
        isLink: true,
        needIcon: true,
        iconClassName: 'el-icon-s-home',
        text: '首页',
        href: '/',
        step: null
      },
      routeList: [
        {
          needIcon: true,
          iconClassName: 'el-icon-edit',
          text: '回退1步',
          step: -1
        },
        {
          needIcon: true,
          iconClassName: 'el-icon-s-comment',
          text: 'route name跳转',
          name: 'AudioTest'
        },
        {
          needIcon: true,
          iconClassName: 'el-icon-s-data',
          text: 'route path跳转',
          path: '/affix-test'
        },
        {
          needIcon: true,
          iconClassName: 'el-icon-video-camera',
          text: '绝对路径跳转',
          href: 'http://www.baidu.com'
        },
        {
          text: '无icon回退2步',
          step: -2
        },
        {
          needIcon: true,
          iconClassName: 'el-icon-s-flag',
          text: '当前页'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-BaseBreadcrumbTest {
}
</style>
