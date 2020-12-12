<template>
  <div class="c-BitEnumTest">
    小吃snack
    <hr />
    小吃特性: {{ snack.entries() }}

    <hr />
    <button @click="getXiaoLongBao">生成小笼包[热乎、有肉、有面皮]</button>
    <ul>
      <li>小笼包:{{ xiaoLongBao }}</li>
      <li>小笼包里面有啥？{{ xiaoLongBao && xiaoLongBao.getMixedKeys() }}</li>
      <li>二进制表示（字符串）{{ xiaoLongBao && xiaoLongBao.getBit() }}</li>
      <li>
        小笼包里面有肉吗？{{ xiaoLongBao && xiaoLongBao.some('hasMeat') }}
      </li>
      <li>
        小笼包里面有米饭吗？{{ xiaoLongBao && xiaoLongBao.some('hasRice') }}
      </li>
      <li>
        小笼包里面有面皮吗？{{ xiaoLongBao && xiaoLongBao.some('hasDough') }}
      </li>
      <li>
        小笼包里面既有肉又有面皮吗？{{
          xiaoLongBao && xiaoLongBao.every('hasMeat', 'hasDough')
        }}
      </li>
    </ul>
    <hr />

    <button @click="getShaoMai">
      生成烧卖[热乎、有肉、有香菇、有面皮、有米饭]
    </button>
    <ul>
      <li>烧卖:{{ shaoMai }}</li>
      <li>烧卖里面有啥？{{ shaoMai && shaoMai.getMixedKeys() }}</li>
      <li>二进制表示（字符串）{{ shaoMai && shaoMai.getBit() }}</li>
    </ul>
    <hr />

    <button @click="getChangFen">
      生成肠粉[热乎、有肉、有菜、有米皮(饭)]
    </button>
    <ul>
      <li>肠粉:{{ changFen }}</li>
      <li>肠粉里面有啥？{{ changFen && changFen.getMixedKeys() }}</li>
      <li>二进制表示（字符串）{{ changFen && changFen.getBit() }}</li>
    </ul>
    <hr />

    <button @click="getDarkFood">生成黑暗料理(烧卖肠粉)</button>
    <ul>
      <li>黑暗料理（烧卖+肠粉）：{{ darkFood }}</li>
      <li>黑暗料理里面有啥？{{ darkFood && darkFood.getMixedKeys() }}</li>
      <li>黑暗料理里面有肉吗？{{ darkFood && darkFood.some('hasMeat') }}</li>
      <li>黑暗料理里面有米饭吗？{{ darkFood && darkFood.some('hasRice') }}</li>
      <li>黑暗料理里面有面皮吗？{{ darkFood && darkFood.some('hasDough') }}</li>
      <li>
        黑暗料理里面既有肉又有面皮吗？{{
          darkFood && darkFood.every('hasMeat', 'hasDough')
        }}
      </li>
      <li>二进制表示： {{ darkFood && darkFood.getBit() }}</li>
    </ul>
  </div>
</template>

<script>
/**
 * * BitEnumTest
 */

import BitEnum from 'Plugins/bit-enum'

export default {
  name: 'BitEnumTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      snack: new BitEnum({
        keys: ['isHot', 'hasMeat', 'hasVeg', 'hasRice', 'hasDough']
      }),
      xiaoLongBao: null,
      shaoMai: null,
      changFen: null,
      darkFood: null
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    getXiaoLongBao() {
      this.xiaoLongBao = this.snack.mix({
        key: 'xiaoLongBao',
        mixedKeys: ['isHot', 'hasMeat', 'hasDough']
      })
    },
    getShaoMai() {
      this.shaoMai = this.snack.mix({
        key: 'shaoMai',
        mixedKeys: ['isHot', 'hasMeat', 'hasVeg', 'hasDough', 'hasRice']
      })
    },
    getChangFen() {
      this.changFen = this.snack.mix({
        key: 'changFen',
        mixedKeys: ['isHot', 'hasMeat', 'hasVeg', 'hasRice']
      })
    },
    getDarkFood() {
      this.darkFood = this.snack.mix({
        key: 'darkFood',
        mixedKeys: ['shaoMai', 'changFen']
      })
    }
  }
}
</script>
