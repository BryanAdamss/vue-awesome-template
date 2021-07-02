<template>
  <div class="c-PromiseCancelableTest">
    <pre>
        const p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve(1000)
      }, 1000)
    })
    const p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve(2000)
      }, 2000)
    })

    const p3 = makePromiseCancelable(500, 'p1超时被取消', p1)

    p3()
      .then(res => {
        alert(`p3----${res}`)
      })
      .catch(err => {
        alert(`p3----${err}`)
      })

    const p4 = makePromiseCancelable(500, 'p1、p2有一个超时了', p1, p2)

    p4()
      .then(res => {
        alert(`p4----${res}`)
      })
      .catch(err => {
        alert(`p4----${err}`)
      })
    </pre>
  </div>
</template>

<script>
/**
 * * PromiseCancelableTest
 */

import { makePromiseCancelable } from 'Utils'

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
        resolve(1000)
      }, 1000)
    })
    const p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve(2000)
      }, 2000)
    })

    const p3 = makePromiseCancelable(500, 'p1超时被取消', p1)

    p3()
      .then(res => {
        alert(`p3----${res}`)
      })
      .catch(err => {
        alert(`p3----${err}`)
      })

    const p4 = makePromiseCancelable(500, 'p1、p2有一个超时了', p1, p2)

    p4()
      .then(res => {
        alert(`p4----${res}`)
      })
      .catch(err => {
        alert(`p4----${err}`)
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
