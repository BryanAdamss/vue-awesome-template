<template>
  <div class="c-ClickOutsideTest">
    <div
      ref="clickOutsideEl"
      v-click-outside="onClickOutside"
      class="c-Box"
    >
      只有点我外侧才会触发clickOutside指令
    </div>
  </div>
</template>

<script>
/**
 * * ClickOutsideTest
 */

// * clickOutSide指令
// import clickoutside from 'Directives/click-outside'

export default {
  name: 'ClickOutsideTest',
  // directives: {
  //   clickoutside
  // },
  methods: {
    onClickOutside(e) {
      console.log('onClickOutside', e)
    }
  }
}
</script>

<style>
.c-Box {
  width: 100px;
  height: 100px;

  font-size: 16px;

  background-color: #f00;
}
</style>
