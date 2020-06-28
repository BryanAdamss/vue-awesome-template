<template>
  <div class="c-ModalTest">
    <BaseModal
      ref="modal"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :emitVisibleChangeEvent="true"
      @onShadowClick="onShadowClick"
      @onVisibleChange="onVisibleChange"
    >
      <div style="background-color:#fff">
        测试modal
        <button
          type="button"
          @click.stop="closeModal"
        >
          &times;
        </button>
        <h1>sjdkfljaslkdfj</h1>
      </div>
    </BaseModal>
    <button @click="onButtonClick">
      展示modal
    </button>
  </div>
</template>

<script>
/**
 * * ModalTest
 */

import BaseModal from 'Base/BaseModal'

export default {
  name: 'ModalTest',
  components: {
    BaseModal
  },
  methods: {
    onButtonClick() {
      this.$refs.modal.open()
    },
    onShadowClick(e) {
      console.log('onShadowClick', e)
    },
    onVisibleChange(newVal, oldVal) {
      console.log('onVisibleChange', newVal, oldVal)
    },
    closeModal() {
      this.$refs.modal.close()
    }
  }
}
</script>
