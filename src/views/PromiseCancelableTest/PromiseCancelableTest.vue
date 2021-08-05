<template>
  <div class="c-PromiseCancelableTest">
    <pre>
    const p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p1 resolved')
      }, 1000)
    })

    const p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p2 resolved')
      }, 2000)
    })

    const p3 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p3 resolved')
      }, 3000)
    })

    const p4 = makePromiseTimeoutAutoCancel(p1,500, 'p1超时被取消')

    p4()
      .then(res => {
        alert(`p4----${res}`)
      })
      .catch(err => {
        alert(`p4 err----${err}`)
      })

    const p5 = makePromiseTimeoutAutoCancel([p2,p3],500, 'p1、p2有一个超时了')

    p5()
      .then(res => {
        alert(`p5----${res}`)
      })
      .catch(err => {
        alert(`p5 err----${err}`)
      })
    </pre>
  </div>
</template>

<script>
/**
 * * PromiseCancelableTest
 */

import { makePromiseTimeoutAutoCancel } from 'Utils'

export default {
  name: 'PromiseCancelableTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    const p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p1 resolved')
      }, 1000)
    })

    const p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p2 resolved')
      }, 2000)
    })

    const p3 = new Promise(resolve => {
      setTimeout(() => {
        resolve('p3 resolved')
      }, 3000)
    })

    const p4 = makePromiseTimeoutAutoCancel(p1,500, 'p1超时被取消')

    p4()
      .then(res => {
        alert(`p4----${res}`)
      })
      .catch(err => {
        alert(`p4 err----${err}`)
      })

    const p5 = makePromiseTimeoutAutoCancel([p2,p3],500, 'p1、p2有一个超时了')

    p5()
      .then(res => {
        alert(`p5----${res}`)
      })
      .catch(err => {
        alert(`p5 err----${err}`)
      })
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-PromiseCancelableTest {
  font-size: 12px;
}
</style>
