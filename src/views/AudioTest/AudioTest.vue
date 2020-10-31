<template>
  <div class="c-AudioTest">
    <!-- <BaseAudio
      :src="'https://mdn.mozillademos.org/files/2587/AudioTest%20(1).ogg'"
      style="width:100%;

font-size:20px;"
    >
      test
    </BaseAudio> -->
    <BaseAudio
      :src="'https://zhixuetest.oss-cn-hangzhou.aliyuncs.com/hanzhang_test/middleHomework/middleweb/zxzy/2020/10/30/1bd095d3-5fff-4ad7-8423-df823e7b51fd_1500000200048087350.mp3'"
      style="width:100%;"
    >
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
  padding: 20px;
}
</style>
