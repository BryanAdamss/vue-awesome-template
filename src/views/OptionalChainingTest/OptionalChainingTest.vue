<template>
  <div class="c-OptionalChainingTest">
    <pre>
      可选链`?.`

      语法：
        obj?.prop
        obj?.[expr]
        arr?.[index]
        func?.(args)

      解释：当`?.`左侧值 === null 或 undefined 时，返回undefined，否则返回`?.`后面的值

      转义：
        对象属性读取
        let nestedProp = obj.first?.second;
        ->
        let nestedProp = obj.first && obj.first.second;

        方法执行
        let result = someInterface.customMethod?.();
        ->
        let result = someInterface.customMethod && someInterface.customMethod();

        方法表达式
        let nestedProp = obj?.['prop' + 'Name'];
        ->
        let nestedProp = obj && obj['prop' + 'Name'];

      文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    </pre>
  </div>
</template>

<script>
/**
 * * OptionalChainingTest
 * * 可选链
 */

export default {
  name: 'OptionalChainingTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-OptionalChainingTest {
  
}
</style>