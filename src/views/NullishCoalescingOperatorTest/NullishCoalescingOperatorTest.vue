<template>
  <div class="c-NullishCoalescingOperatorTest">
    <pre>
      空值合并操作符`??`
      语法： a ?? b
      解释：当a不为null且不为undefined时，返回a，否则返回b
      转义：a !== null && a !== void 0 ? a : b
      和或运算符区别：a || b，当a不为falsy值(null、undefined、0、''、NaN)时，返回a，否则返回b
      
      let myText = ''; // 一个falsy值

      let notFalsyText = myText || 'Hello world';
      console.log(notFalsyText); // Hello world

      let preservingFalsy = myText ?? 'Hi neighborhood';
      console.log(preservingFalsy); // '' (myText不为null且不为undefined)

      和可选链(?.)一起使用
      let customer = {
        name: "Carl",
        details: { age: 82 }
      };

      let customerCity = customer?.city ?? "哥谭市";
      console.log(customerCity); // “哥谭市”

      文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
    </pre>
  </div>
</template>

<script>
/**
 * * NullishCoalescingOperatorTest
 * * 空值合并
 */

export default {
  name: 'NullishCoalescingOperatorTest',
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
.c-NullishCoalescingOperatorTest {
  
}
</style>