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
  min-width: rem(400px);
  max-width: 100%;

  font-size: 16px;

  background-color: #fff;
  border-radius: 0.2em;
  &-hd {
    padding: rem(10px) rem(20px);
  }
  &-bd {
    padding: 0 rem(20px) rem(10px) rem(20px);

    color: $text-color-primary;
    font-size: 1em;
    @extend %text-wrap;
  }
}

.c-BtnGroup {
  position: relative;

  display: flex;
  justify-content: space-between;
  &::after {
    @include hairline-top();
  }
}
.c-Btn {
  flex: 1 1 auto;

  color: $text-color-regular;
  font-size: 1em;
  line-height: 2em;
  text-align: center;
  &:active {
    background-color: #eee;
    opacity: 0.8;
  }
  & + & {
    position: relative;

    color: $brand-primary;
    &::after {
      @include hairline-left();
    }
  }
}

.c-Title {
  margin: 0;

  color: $text-color-primary;
  font-weight: bold;
  font-size: 1.125em;
  text-align: center;
}
</style>
