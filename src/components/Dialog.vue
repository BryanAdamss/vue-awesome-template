<template>
  <BasePopUp
    :isShow.sync="dialogShow"
    :shadowClose="shadowClose">
    <div
      :style="{
        width:typeof width==='string' ? width :`${width}px`
      }"
      class="c-Dialog">
      <slot name="hd">

        <div class="c-Dialog-hd">
          <div class="c-Hd">

            <div
              :title="title"
              class="c-Hd-main"
              v-text="title"/>

            <div class="c-Hd-sub">

              <span
                class="c-Close"
                title="关闭弹窗"
                @click="close">&times;</span>

            </div>
          </div>
        </div>

      </slot>
      <div
        :class="{'is-radius':!$slots.ft}"
        class="c-Dialog-bd">

        <slot>

          <p
            class="c-Tips"
            v-text="content"/>

        </slot>

      </div>
      <div
        class="c-Dialog-ft">

        <slot
          v-bind="{ close,open }"
          name="ft">

          <div
            v-if="type !=='custom'"
            class="c-BtnWp">

            <template v-if="type === 'confirm'">

              <button
                @click="handleCancel"
                v-text="cancelText"/>

            </template>

            <button
              @click="handleConfirm"
              v-text="confirmText"/>

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
  border-radius: 4px;
  background-color: #fff;

  color: $mainTextColor;

  &-hd {
    border-radius: 4px 4px 0 0;
    background: $mainTone;
  }

  &-bd {
    background-color: #fff;
    padding: 8px 16px;
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
  font-size: 14px;
  color: #fff;
  padding: 8px 16px;
  &-main {
    flex: 1 1 auto;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
  }
  &-sub {
    flex: 0 0 auto;
  }
}

.c-Close {
  cursor: pointer;
  font-size: 24px;
  line-height: 22px;
  @include inline-block();
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
  }
}

.c-BtnWp {
  text-align: right;
  padding: 0 24px 24px 24px;
}

.c-Tips {
  @extend %textWrap;

  font-size: 14px;
  color: $subTextColor;

  padding: 16px 8px;
}
</style>
