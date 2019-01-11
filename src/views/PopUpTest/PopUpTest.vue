<template>
  <div class="c-PopUpTest">

    <div>
      <button
        v-for="(btn,btnIndex) in buttons"
        :key="btnIndex"
        type="button"
        @click="onButtonClick(btn.label)"
      >位置{{ btn.label }}</button>
    </div>

    <BasePopUp
      v-for="(btn,btnIndex) in buttons"
      :key="btnIndex"
      :ref="'modal-'+btn.label"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :emitVisibleChangeEvent="true"
      :position="btn.label"
      @onShadowClick="onShadowClick"
      @onVisibleChange="onVisibleChange"
    >
      <div style="background-color:#fff;height:100%;">测试modal
        <button
          type="button"
          @click.stop="closeModal"
        >&times;</button>
        <h1>{{ btn.label }} <br> 查看控制台输出</h1>
      </div>
    </BasePopUp>

  </div>
</template>

<script>
/**
 * * PopUpTest
 */

import BasePopUp from 'Base/BasePopUp'

export default {
  name: 'PopUpTest',
  components: {
    BasePopUp
  },
  data() {
    return {
      buttons: [
        {
          label: 'center'
        },
        {
          label: 'top'
        },
        {
          label: 'right'
        },
        {
          label: 'bottom'
        },
        {
          label: 'left'
        }
      ],
      curPopUpName: ''
    }
  },
  methods: {
    onButtonClick(pos) {
      const popUpName = 'modal-' + pos
      this.$refs[popUpName][0].open()
      this.curPopUpName = popUpName
    },
    onShadowClick(e) {
      console.log('onShadowClick', e)
    },
    onVisibleChange(newVal, oldVal) {
      console.log('onVisibleChange', newVal, oldVal)
    },
    closeModal() {
      this.$refs[this.curPopUpName][0].close()
    }
  }
}
</script>
