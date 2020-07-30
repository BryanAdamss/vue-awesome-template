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
  inject: [
    'CHILD_NAME'
  ],
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
.c-ConstLoaderTestChild {
}
</style>
