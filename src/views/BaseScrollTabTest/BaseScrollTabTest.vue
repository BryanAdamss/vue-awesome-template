<template>
  <div class="c-BaseScrollTabTest">
    <BaseScrollTab
      ref="scrollTab"
      :dataList="tabList"
      @change="handleChange"
    >

      <template v-slot="{item,index}">
        <div>
          {{ index }}、{{ item.text }}
        </div>
      </template>

      <template v-slot:prev>
        <i class="el-icon-arrow-left"/>
      </template>

      <template v-slot:next>
        <i class="el-icon-arrow-right"/>
      </template>

    </BaseScrollTab>

    <button @click="$refs.scrollTab.movePage(1)">prev page</button>
    <button @click="$refs.scrollTab.movePage(-1)">next page</button>
    <br>
    <button @click="$refs.scrollTab.go(-3)">向后位移 3步</button>
    <button @click="$refs.scrollTab.go(3)">向前位移 3步</button>
    <br>
    <button @click="$refs.scrollTab.go(-1)">向后位移 1</button>
    <button @click="$refs.scrollTab.go(1)">向前位移 1</button>
    <br>
    <button @click="$refs.scrollTab.go(-5)">向后位移 5</button>
    <button @click="$refs.scrollTab.go(5)">向前位移 5</button>
    <br>
    <button @click="$refs.scrollTab.go(-7)">向后位移 7</button>
    <button @click="$refs.scrollTab.go(7)">向前位移 7</button>
    <br>
    <button @click="$refs.scrollTab.goTo(1)">跳到 1</button>
    <button @click="$refs.scrollTab.goTo(2)">跳到 2</button>
    <button @click="$refs.scrollTab.goTo(3)">跳到 3</button>
    <button @click="$refs.scrollTab.goTo(4)">跳到 4</button>
    <button @click="$refs.scrollTab.goTo(5)">跳到 5</button>
    <button @click="$refs.scrollTab.goTo(6)">跳到 6</button>
    <button @click="$refs.scrollTab.goTo(7)">跳到 7</button>
    <button @click="$refs.scrollTab.goTo(8)">跳到 8</button>
    <button @click="$refs.scrollTab.goTo(9)">跳到 9</button>
    <button @click="$refs.scrollTab.goTo(10)">跳到 10</button>
    <button @click="$refs.scrollTab.goTo(11)">跳到 11</button>
  </div>
</template>

<script>
/**
 * * BaseScrollTabTest
 */

import BaseScrollTab from 'Base/BaseScrollTab'

export default {
  name: 'BaseScrollTabTest',
  components: {
    BaseScrollTab
  },
  mixins: [],
  props: {},
  data() {
    return {
      tabList: [
        {
          id: 1,
          text: '详情'
        },
        {
          id: 2,
          text: '标签2'
        }, {
          id: 3,
          text: '标签2'
        }, {
          id: 4,
          text: '标签2'
        }, {
          id: 5,
          text: '标签1111111112'
        }, {
          id: 6,
          text: '标签2'
        }, {
          id: 7,
          text: '标签2'
        }, {
          id: 8,
          text: '标签2'
        }, {
          id: 9,
          text: '标签2222222222222'
        }, {
          id: 10,
          text: '111'
        }, {
          id: 11,
          text: '11331'
        }, {
          id: 12,
          text: '11551'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleChange(...args) {
      console.log(args)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseScrollTabTest {
  /deep/ .c-BaseScrollTab-item.is-active {
    color: red;
  }
}
</style>
