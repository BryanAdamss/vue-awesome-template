<template>
  <div class="c-VuexTest">
    <span>{{ globalTestObjName }}</span>
    <div @click="change">
      点击设置全局vuex
    </div>

    <span>moduleANameLen：{{ moduleANameLen }}</span>
    <div @click="setModuleAName({ moduleAName: Math.random().toString() })">
      点击设置模块A Vuex
    </div>

    <span>moduleBNameLen：{{ moduleBNameLen }}</span>
    <div @click="setModuleBName({ moduleBName: Math.random().toString() })">
      点击设置模块B Vuex
    </div>
  </div>
</template>

<script>
/**
 * * VuexTest
 */

import {
  // mapActions,
  createNamespacedHelpers,
  mapGetters,
  mapMutations
} from 'vuex' // * 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数

import store from './store'

const {
  mapGetters: mapGettersForModuleA,
  mapMutations: mapMutationsForModuleA
} = createNamespacedHelpers('VuexTest/moduleA') // * 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数

const {
  mapGetters: mapGettersForModuleB,
  mapMutations: mapMutationsForModuleB
} = createNamespacedHelpers('VuexTest/moduleB')

export default {
  name: 'VuexTest',
  beforeRouteEnter(to, from, next) {
    // 路由进入时注册模块
    if (!window.installed) {
      // 防止重复注册，vuex报错
      store.install()
      window.installed = true
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.$once('hook:beforeDestroy', () => {
      // 路由离开时卸载模块
      store.uninstall() // uninstall的最佳时机应该在 DOM 更新中或后，旧的页面组件实例销毁过程调用时
    })
    next()
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters(['globalTestObjName']), // 全局getter
    // ...mapGetters('VuexTest/moduleA', ['moduleANameLen']), // 使用传参形式获取模块a下的getter
    ...mapGettersForModuleA(['moduleANameLen']), // 使用模块a专有mapGetter获取模块a下的getter
    // ...mapGetters('VuexTest/moduleB', ['moduleBNameLen']), // 模块b下的getter
    ...mapGettersForModuleB(['moduleBNameLen']) // 使用模块b专有mapGetter获取模块b下的getter
  },

  methods: {
    change() {
      this.setGlobalTestObj({
        name: `test ${this.count++}`
      })
    },
    ...mapMutations({
      setGlobalTestObj: 'SET_GLOBAL_TEST_OBJ' // 获取全局下的mutation
    }),
    // ...mapMutations('VuexTest/moduleA', {
    //   setModuleAName: 'SET_MODULE_A_NAME'
    // }),
    ...mapMutationsForModuleA({
      setModuleAName: 'SET_MODULE_A_NAME' // 使用模块a专有的mapMutation获取模块a的mutation
    }),
    // ...mapMutations('VuexTest/moduleB', {
    //   setModuleBName: 'SET_MODULE_B_NAME'
    // }),
    ...mapMutationsForModuleB({
      setModuleBName: 'SET_MODULE_B_NAME' // 使用模块b专有的mapMutation获取模块b的mutation
    })
  }
}
</script>
