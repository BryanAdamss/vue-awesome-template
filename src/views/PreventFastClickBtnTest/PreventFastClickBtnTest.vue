<template>
  <div class="c-PreventFastClickBtnTest">
    <BaseBtnPreventFastClick
      tag="div"
      class="c-MyBtn"
      @click="onClick"
    >
      点击
    </BaseBtnPreventFastClick>

    <!-- 也可以使用v-once来屏蔽多次点击 -->
    <div @click.once="onClick">用once实现的防止快速点击，执行一次后，就不会再触发事件。适合场景：点击删除，移除当前元素</div>
  </div>
</template>

<script>
/**
 * * PreventFastClickBtnTest
 */

import BaseBtnPreventFastClick from 'Base/BaseBtnPreventFastClick'

export default {
  name: 'PreventFastClickBtnTest',
  components: {
    BaseBtnPreventFastClick
  },
  methods: {
    onClick() {
      console.count('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-MyBtn {
  color: blue;
  cursor: pointer;
}
</style>
