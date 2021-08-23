<template>
  <div class="c-SaverTest">
    <button @click="setVal(Math.random())">
      存储随机数到'SaverTest'模块的'num'中
    </button>
    <button @click="getVal()">
      读取随机数值
    </button>
    <button @click="getAllKeys()">
      获取'SaverTest'模块内所有keys
    </button>
    <button @click="getAllKeyFullName()">
      获取'SaverTest'模块内所有key的完整keyName
    </button>
    <button @click="clear()">
      清除模块内数据
    </button>
    <button @click="getNamespace()">
      获取命名空间
    </button>
    <hr />
    value:{{ value }}
    <br />
    allKeys:{{ allKeys }}
    <br />
    allKeyFullNames:{{ allKeyFullNames }}
    <br />
    namespace:{{ namespace }}
  </div>
</template>

<script>
/**
 * * SaverTest
 */

import { Saver } from 'Plugins/saver'

export default {
  name: 'SaverTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      testSaver: new Saver({
        // 模块化Saver
        moduleName: 'SaverTest',
        isSession: true // sessionStorage
      }),
      globalSaver: new Saver(), // 全局 localStorageSaver
      value: 0,

      allKeys: [],
      allKeyFullNames: [],

      namespace: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    console.log('修改了namespace的全局localStorageSaver:', this.$saver)
    console.log('修改了namespace的全局sessionStorageSaver:', this.$sessionSaver)

    console.log('默认namespace的全局localStorageSaver:', this.globalSaver)
    this.globalSaver.setItem('test', 'testItem')

    console.log('模块化sessionSaver:', this.testSaver)
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
    getAllKeyFullName() {
      this.allKeyFullNames = this.testSaver.getAllKeyFullNames()
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
