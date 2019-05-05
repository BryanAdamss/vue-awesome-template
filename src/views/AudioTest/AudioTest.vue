<template>
  <div class="c-AudioTest">
    <BaseAudio :src="'https://mdn.mozillademos.org/files/2587/AudioTest%20(1).ogg'">
      test
    </BaseAudio>
  </div>
</template>

<script>
/**
 * * AudioTest
 */

import BaseAudio from 'Base/BaseAudio'

export default {
  name: 'AudioTest',
  components: {
    BaseAudio
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {

  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-AudioTest {
}
</style>
