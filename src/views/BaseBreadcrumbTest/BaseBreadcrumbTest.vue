<template>
  <div class="c-BaseBreadcrumbTest">
    <BaseBreadcrumb
      :needHome="true"
      :needHomeIcon="true"
      :sep="'/'"
      :homeIconClassName="'el-icon-s-home'"
      :homeText="'首页'"
      :routeList="routeList"/>

    <hr>
    <p>使用slot-scope 自定义样式</p>
    <BaseBreadcrumb
      :needHome="true"
      :needHomeIcon="true"
      :homeIconClassName="'el-icon-s-home'"
      :homeText="'首页'"
      :routeList="routeList">

      <template
        v-slot:home= "{ needIcon,homeIconClassName,homeText,homePath }">
        <p>home</p>
        {{ homeIconClassName }}、{{ homeText }}、{{ homePath }}

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
