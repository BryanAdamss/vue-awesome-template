<template>
  <div>
    <div class="box">
      asdjifajsiodfji
    </div>
    <div>
      <p>占位行1</p>
      <p>占位行2</p>
      <p>占位行3</p>
      <p>占位行4</p>
      <p>占位行5</p>
      <p>占位行6</p>
      <p>占位行7</p>
      <p>占位行8</p>
      <p>占位行9</p>
      <p ref="test" v-affix="affixProps" class="c-AffixTest" @click="test">
        测试affix
      </p>
      <p>占位行10</p>
      <p>占位行11</p>
      <p>占位行12</p>
      <p>占位行13</p>
      <p>占位行14</p>
      <p>占位行15</p>
      <p>占位行16</p>
      <p>占位行17</p>
      <p>占位行18</p>
      <p>占位行19</p>
      <p>占位行20</p>
    </div>
  </div>
</template>

<script>
/**
 * * AffixTest
 */

export default {
  name: 'AffixTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      affixProps: null
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    const threshold = this.$refs.test.offsetTop

    this.affixProps = {
      container: '.c-BaseLayoutVertical-bd', // 滚动容器
      threshold, // 触发affixed阈值
      fixedElPos: {
        // fixed元素的位置
        top: '35px'
        // left: '50%',
      },
      onAffixed(el) {
        // 触发affixed回调
        console.log('fixed元素为:', el)
      },
      interval: 20 // 滚动事件触发频率
    }
  },
  methods: {
    test() {
      alert(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-AffixTest {
  background-color: red;
}

p {
  margin: 0;
  padding: 10px 0;
}
</style>
