/**
 * @author GuangHui
 * @description vue组件模板
 */

module.exports = `<template>
  <div class="c-{{viewName}}"></div>
</template>

<script>
/**
 * * {{viewName}}
 * * {{desc}}
 */

export default {
  name: '{{viewName}}',
  components: {},
  mixins: [],
  props: {},
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
.c-{{viewName}} {
  
}
</style>`
