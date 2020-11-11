<template>
  <span
    :class="{ 'is-link':isLink }"
    class="c-BaseBreadcrumbItem"
  >

    <template v-if="needIcon">

      <!-- 图标 -->
      <span
        v-if="iconClassName"
        class="c-BaseBreadcrumbItem-icon"
      >

        <i
          :class="[iconClassName]"
        />

      </span>
      <!-- 图标 end -->

    </template>

    <!-- 文案 -->
    <span
      :title="text"
      class="c-BaseBreadcrumbItem-text"
      @click="$emit('item-click')"
      v-text="text"
    />
    <!-- 文案 end -->

    <!-- 分隔符 -->
    <template v-if="needSep">

      <template v-if="sepIconClassName">
        <!-- 图标分隔符 -->
        <i
          :class="[sepIconClassName]"
          class="c-BaseBreadcrumbItem-sep"
        />
        <!-- 图标分隔符 end -->

      </template>
      <template v-else>

        <!-- 字符分隔符 -->
        <span
          class="c-BaseBreadcrumbItem-sep"
          v-text="sep"
        />
        <!-- 字符分隔符 end -->

      </template>

    </template>
    <!-- 分隔符 end -->

  </span>
</template>

<script>
/**
 * * BaseBreadcrumbItem
 * * 基础面包屑导航 - item
 */

export default {
  name: 'BaseBreadcrumbItem',
  components: {},
  mixins: [],
  props: {
    isLink: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      required: true
    },
    needIcon: {
      type: Boolean,
      default: false
    },
    iconClassName: {
      type: String,
      default: ''
    },
    needSep: {
      type: Boolean,
      default: true
    },
    sep: {
      type: String,
      default: '❯'
    },
    sepIconClassName: {
      type: String,
      default: ''
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-BaseBreadcrumbItem {
  color: #262626;
  font-size: 12px;
  &.is-link {
    color: #999;

    cursor: pointer;
    &:hover {
      color: darken($color: #999, $amount: 20);
    }
  }

  &-sep {
    margin-right: 0.5em;
    margin-left: 0.5em;
  }
}
</style>
