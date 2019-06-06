<template>
  <div class="c-SaverTest">
    <button @click="setVal(Math.random())">存储随机数</button>
    <button @click="getVal()">读取随机数</button>
    <button @click="getAllKeys()">获取模块内所有keys</button>
    <button @click="clear()">清除模块内数据</button>
    <button @click="getNamespace()">获取命名空间</button>
    {{ value }}
    <br>
    {{ allKeys }}
    <br>
    {{ namespace }}

  </div>
</template>

<script>
/**
 * * SaverTest
 */

import Saver from 'Plugins/saver'

export default {
  name: 'SaverTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      testSaver: new Saver({ // 模块化Saver
        moduleName: 'SaverTest',
        session: true // sessionStorage
      }),
      globalSaver: new Saver(), // 全局 localStorageSaver
      value: 0,
      allKeys: null,
      namespace: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.globalSaver.setItem('test', 'testItem')
  },
  mounted() {},
  methods: {
    getNamespace() {
      this.namespace = this.testSaver.getNamespace()
    },
    clear() {
      this.testSaver.clear()
    },
    getAllKeys() {
      this.allKeys = this.testSaver.getAllKeys()
    },
    setVal(val) {
      this.testSaver.setItem('num', val)
    },
    getVal() {
      this.value = this.testSaver.getItem('num')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-SaverTest {
}
</style>
