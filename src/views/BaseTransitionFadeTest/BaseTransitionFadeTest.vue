<template>
  <div class="c-BaseTransitionFadeTest">

    <button @click="addItem">添加</button>
    <p>点击删除</p>

    <div class="c-BoxWp">

      <BaseTransitionFade
        group
        tag="ul">

        <template>

          <li
            v-for="(item, index) in list"
            :key="item"

            @click="remove(index)"
            v-text="item"/>

        </template>

      </BaseTransitionFade>

    </div>

  </div>

</template>

<script>
/**
 * * BaseTransitionFadeTest
 */

import BaseTransitionFade from 'Base/BaseTransitionFade'

export default {
  name: 'BaseTransitionFadeTest',
  components: {
    BaseTransitionFade
  },
  mixins: [],
  props: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    remove(index) {
      this.list.splice(index, 1)
    },
    addItem() {
      let randomIndex = Math.floor(Math.random() * this.list.length)
      this.list.splice(randomIndex, 0, Math.random())
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseTransitionFadeTest {
}

.c-BoxWp {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
}

.c-Box {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-right: 10px;
  background-color: rgb(108, 141, 213);
  box-shadow: rgba(108, 141, 213, 0.5) 0px 6px 20px;
  border-radius: 10px;
}
</style>
