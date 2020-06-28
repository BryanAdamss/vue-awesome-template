<template>
  <div class="c-CopyTextToClipBoardTest">
    <input
      ref="copyInputEl"
      v-model="text"
      type="text"
    >
    <button @click="handleClick">
      拷贝输入框内容
    </button>
    <p>尝试ctrl+v</p>
  </div>
</template>

<script>
/**
 * * CopyTextToClipBoardTest
 */

import { select } from 'Utils/select'
import { copyTextToClipBoard } from 'Utils/copy'

export default {
  name: 'CopyTextToClipBoardTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      text: '被拷贝的文本'
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      copyTextToClipBoard(this.text).then(selectedText => {
        console.log('selectedText', selectedText)

        alert('拷贝成功，试试ctrl+v')
      }).catch(err => {
        alert('拷贝失败，可以手动ctrl+c复制')
        console.log(err)

        select(this.$refs.copyInputEl)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-CopyTextToClipBoardTest {
}
</style>
