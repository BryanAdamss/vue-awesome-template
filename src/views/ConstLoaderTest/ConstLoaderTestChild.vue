<template>
  <div class="c-ConstLoaderTestChild">
    {{ CHILD_NAME }}
  </div>
</template>

<script>
/**
 * * ConstLoaderTestChild
 */

export default {
  name: 'ConstLoaderTestChild',
  components: {},
  mixins: [],
  inject: ['CHILD_NAME'],
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
.c-ConstLoaderTestChild {
}
</style>
