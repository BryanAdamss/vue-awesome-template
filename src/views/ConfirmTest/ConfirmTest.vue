<template>
  <div class="c-ConfirmTest">
    <button type="button" @click.stop="showConfirm">
      点击展示confirm
    </button>
    <BaseConfirm
      ref="confirm"
      title="我是新标题"
      @click-cancel="onClickCancel"
      @click-ok="onClickOk"
    >
      <!-- <div slot="header">我是自定义标题</div> -->
      我是测试内容
    </BaseConfirm>
  </div>
</template>

<script>
/**
 * * ConfirmTest
 */

import BaseConfirm from 'Base/BaseConfirm'

export default {
  name: 'ConfirmTest',
  components: {
    BaseConfirm
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.open()
    },
    onClickCancel() {
      console.log('Cancel')
    },
    onClickOk() {
      console.log('OK')
    }
  }
}
</script>
