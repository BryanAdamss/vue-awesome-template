<template>
  <BasePopUp
    ref="popup"
    :isShow.sync="popupShow"
  >
    <div class="c-BaseConfirm">
      <div class="c-BaseConfirm-hd">
        <slot name="header">
          <h2 class="c-Title">
            {{ title }}
          </h2>
        </slot>
      </div>
      <div class="c-BaseConfirm-bd">
        <slot>
          内容
        </slot>
      </div>
      <div class="c-BaseConfirm-ft">
        <div class="c-BtnGroup">
          <div
            class="c-Btn"
            @click.stop="onClickCancel"
          >
            取消
          </div>
          <div
            class="c-Btn"
            @click.stop="onClickOk"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </BasePopUp>
</template>

<script>
/**
 * * BaseConfirm
 */

import BasePopUp from 'Base/BasePopUp'

export default {
  name: 'BaseConfirm',
  components: {
    BasePopUp
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      popupShow: false
    }
  },
  methods: {
    open() {
      this.$refs.popup.open()
    },
    close() {
      this.$refs.popup.close()
    },
    onClickCancel() {
      this.$emit('onClickCancel')
      this.close()
    },
    onClickOk() {
      this.$emit('onClickOk')
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseConfirm {
  max-width: 100%;
  min-width: rem(400px);
  background-color: #fff;
  border-radius: 0.2em;
  font-size: 16px;
  &-hd {
    padding: rem(10px) rem(20px);
  }
  &-bd {
    font-size: 1em;
    color: $mainTextColor;
    padding: 0 rem(20px) rem(10px) rem(20px);
    @extend %textWrap;
  }
}

.c-BtnGroup {
  display: flex;
  justify-content: space-between;
  position: relative;
  &::after {
    @include setTopLine();
  }
}
.c-Btn {
  font-size: 1em;
  color: $subTextColor;
  text-align: center;
  flex: 1 1 auto;
  line-height: 2em;
  &:active {
    opacity: 0.8;
    background-color: #eee;
  }
  & + & {
    position: relative;
    color: $mainTone;
    &::after {
      @include setLeftLine();
    }
  }
}

.c-Title {
  font-size: 1.125em;
  font-weight: bold;
  margin: 0;
  text-align: center;
  color: $mainTextColor;
}
</style>
