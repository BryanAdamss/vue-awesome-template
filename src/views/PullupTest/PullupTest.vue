<template>
  <div class="c-PullupTest">
    <ul
      ref="ul"
      v-pull-up="onPullup"
      class="c-List"
    >
      <li
        v-for="item in list"
        :key="item"
        v-text="item"
      />
    </ul>
  </div>
</template>

<script>
/**
 * * PullupTest
 */

export default {
  name: 'PullupTest',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
  },
  methods: {
    genNewLi() {
      return new Promise((resolve, reject) => {
        const delayMs = Math.floor(Math.random() * 1000 * 4)
        console.log('delayMs', delayMs)

        setTimeout(() => {
          const len = Math.floor(Math.random() * 10 + 1)

          resolve(new Array(len).fill(0).map(item => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)))
        }, delayMs)
      })
    },
    onPullup(pullupEnd) {
      console.log('onPullup')
      this.genNewLi()
        .then(arr => {
          console.log('new li arr:', arr)
          this.list = this.list.concat(arr)

          pullupEnd()
        })
        .catch(err => {
          console.log(err)
          pullupEnd()
        })
    }
  }
}
</script>

<style scoped>
.c-PullupTest {
  height: 400px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  border: 1px solid blue;
}
</style>
