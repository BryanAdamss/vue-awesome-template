<template>
  <div class="c-PopUpTest">
    <div>
      <button
        v-for="(btn,btnIndex) in buttons"
        :key="btnIndex"
        type="button"
        @click="onButtonClick(btn.label)"
      >
        位置{{ btn.label }}
      </button>
    </div>

    <BasePopUp
      :ref="`modal-${buttons[0].label}`"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :position="buttons[0].label"
      :isShow.sync="isShowCenter"
    >
      <div class="c-Box">
        测试modal
        <button
          type="button"
          @click.stop="closeModal(buttons[0].label)"
        >
          &times;
        </button>
        <div>{{ buttons[0].label }} <br> 查看控制台输出</div>
      </div>
    </BasePopUp>
    <BasePopUp
      :ref="`modal-${buttons[1].label}`"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :position="buttons[1].label"
      :isShow.sync="isShowTop"
    >
      <div class="c-Box">
        测试modal
        <button
          type="button"
          @click.stop="closeModal(buttons[1].label)"
        >
          &times;
        </button>
        <div>{{ buttons[1].label }} <br> 查看控制台输出</div>
      </div>
    </BasePopUp>
    <BasePopUp
      :ref="`modal-${buttons[2].label}`"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :position="buttons[2].label"
      :isShow.sync="isShowRight"
    >
      <div class="c-Box">
        测试modal
        <button
          type="button"
          @click.stop="closeModal(buttons[2].label)"
        >
          &times;
        </button>
        <div>{{ buttons[2].label }} <br> 查看控制台输出</div>
      </div>
    </BasePopUp>
    <BasePopUp
      :ref="`modal-${buttons[3].label}`"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :position="buttons[3].label"
      :isShow.sync="isShowBottom"
    >
      <div class="c-Box">
        测试modal
        <button
          type="button"
          @click.stop="closeModal(buttons[3].label)"
        >
          &times;
        </button>
        <div>{{ buttons[3].label }} <br> 查看控制台输出</div>
      </div>
    </BasePopUp>
    <BasePopUp
      :ref="`modal-${buttons[4].label}`"
      :shadowClose="true"
      :emitShadowClickEvent="true"
      :position="buttons[4].label"
      :isShow.sync="isShowLeft"
    >
      <div class="c-Box">
        测试modal
        <button
          type="button"
          @click.stop="closeModal(buttons[4].label)"
        >
          &times;
        </button>
        <div>{{ buttons[4].label }} <br> 查看控制台输出</div>
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
      curPopUpName: '',
      isShowCenter: false,
      isShowTop: false,
      isShowRight: false,
      isShowBottom: false,
      isShowLeft: false
    }
  },
  methods: {
    onButtonClick(pos) {
      const popUpName = 'modal-' + pos
      console.log(this.$refs[popUpName])
      this[`isShow${pos.replace(/^\S/, function(s) { return s.toUpperCase() })}`] = true
      this.curPopUpName = popUpName
    },
    closeModal(pos) {
      this[`isShow${pos.replace(/^\S/, function(s) { return s.toUpperCase() })}`] = false
    }
  }
}
</script>

<style lang="scss">
.c-Box {
  height: 100%;

  background-color: #fff;
}
</style>
