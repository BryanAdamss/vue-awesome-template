<template>
  <div class="c-LayoutTest">
    c-BaseLayoutVertical节点的父节点需要有高度
    <BaseLayoutVertical>
      <div slot="header">header</div>

      <BaseLayoutHorizontal>
        <div slot="side">side</div>
        main
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <h1>a</h1>
        <div slot="extra">extra</div>
      </BaseLayoutHorizontal>

      <div slot="footer">footer</div>
    </BaseLayoutVertical>
  </div>
</template>

<script>
/**
 * * LayoutTest
 */
import BaseLayoutHorizontal from 'Base/BaseLayoutHorizontal'
import BaseLayoutVertical from 'Base/BaseLayoutVertical'

export default {
  name: 'LayoutTest',
  components: {
    BaseLayoutHorizontal,
    BaseLayoutVertical
  }
}
</script>

<style lang="scss" scoped>
.c-LayoutTest {
  height: 500px;
}
</style>
