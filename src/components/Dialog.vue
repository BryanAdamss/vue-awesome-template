<template>
  <BasePopUp
    :isShow.sync="dialogShow"
    :shadowClose="shadowClose"
    :appendToBody="appendToBody"
    :zIndex="zIndex"
  >
    <div
      :style="{
        width: typeof width === 'string' ? width : `${width}px`
      }"
      class="c-Dialog"
    >
      <slot name="hd">
        <div class="c-Dialog-hd">
          <div class="c-Hd">
            <div :title="title" class="c-Hd-main" v-text="title" />

            <div class="c-Hd-sub">
              <span class="c-Close" title="关闭弹窗" @click="close"
                >&times;</span
              >
            </div>
          </div>
        </div>
      </slot>
      <div :class="{ 'is-radius': !$slots.ft }" class="c-Dialog-bd">
        <slot>
          <p class="c-Tips" v-text="content" />
        </slot>
      </div>
      <div class="c-Dialog-ft">
        <slot v-bind="{ close, open }" name="ft">
          <div v-if="type !== 'custom'" class="c-BtnWp">
            <template v-if="type === 'confirm'">
              <button @click="handleCancel" v-text="cancelText" />
            </template>

            <button @click="handleConfirm" v-text="confirmText" />
          </div>
        </slot>
      </div>
    </div>
  </BasePopUp>
</template>

<script>
/**
 * * Dialog
 * * 弹出框
 */

import BasePopUp from 'Base/BasePopUp'

const TYPES = ['tips', 'confirm', 'custom']

export default {
  name: 'Dialog',
  components: {
    BasePopUp
  },
  mixins: [],
  props: {
    width: {
      type: [String, Number],
      default: 540
    },
    title: {
      type: String,
      default: '温馨提示'
    },
    shadowClose: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'custom',
      validator(val) {
        return TYPES.indexOf(val) > -1
      }
    },
    content: {
      type: String,
      default: '内容'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      dialogShow: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleCancel() {
      // 如果监听了cancel事件，则调用cancel handler
      if (this.$listeners && this.$listeners.cancel) {
        this.$listeners.cancel()
      } else {
        // 否则直接调用close关闭
        this.close()
      }
    },
    handleConfirm() {
      if (this.type === 'confirm') {
        this.$emit('confirm')
        return
      }

      if (this.type === 'tips') this.close()
    },
    open() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-Dialog {
  color: $text-color-primary;

  background-color: #fff;
  border-radius: 4px;

  &-hd {
    background: $theme-primary;
    border-radius: 4px 4px 0 0;
  }

  &-bd {
    padding: 8px 16px;

    background-color: #fff;
    &.is-radius {
      border-radius: 0 0 4px 4px;
    }
  }

  &-ft {
    background-color: #fff;
    border-radius: 0 0 4px 4px;
  }
}

.c-Hd {
  display: flex;
  padding: 8px 16px;

  color: #fff;
  font-size: 14px;
  &-main {
    flex: 1 1 auto;
    overflow: hidden;

    line-height: 24px;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-sub {
    flex: 0 0 auto;
  }
}

.c-Close {
  position: relative;

  font-size: 24px;
  line-height: 22px;

  cursor: pointer;
  @include inline-block();
  &:hover {
    opacity: 0.8;
  }
  &::after {
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;

    content: '';
  }
}

.c-BtnWp {
  padding: 0 24px 24px 24px;

  text-align: right;
}

.c-Tips {
  @extend %text-wrap;

  padding: 16px 8px;

  color: $text-color-regular;

  font-size: 14px;
}
</style>
