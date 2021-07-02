<template>
  <div class="c-IntroTest">
    <div id="d1">
      1
    </div>
    <div id="d2">
      2
    </div>
    <div id="d3">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
      voluptas repellat omnis et in incidunt sequi iusto similique tenetur,
      cumque perspiciatis quaerat non totam quam adipisci animi aspernatur alias
      expedita.
    </div>
  </div>
</template>

<script>
/**
 * * IntroTest
 * * 新手引导
 */

import 'driver.js/dist/driver.min.css'

export default {
  name: 'IntroTest',
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
  mounted() {
    setTimeout(() => {
      // https://github.com/kamranahmedse/driver.js

      import(/* webpackChunkName:'driver.js' */ 'driver.js')
        .then(({ default: Driver }) => {
          const driver = new Driver({
            nextBtnText: '下一步',
            prevBtnText: '上一步',
            closeBtnText: '关闭',
            doneBtnText: '完成'
          })

          // Define the steps for introduction
          driver.defineSteps([
            {
              element: '#d1',
              popover: {
                className: 'first-step-popover-class',
                title: 'Title on Popover',
                description: 'Body of the popover',
                position: 'left'
              }
            },
            {
              element: '#d2',
              popover: {
                title: 'Title on Popover',
                description: 'Body of the popover',
                position: 'top'
              }
            },
            {
              element: '#d3',
              popover: {
                title: 'Title on Popover',
                description: 'Body of the popover',
                position: 'right'
              }
            }
          ])

          // Start the introduction
          driver.start()
        })
        .catch(err => {
          console.log(err)
        })
    }, 200)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-IntroTest {
}
</style>
