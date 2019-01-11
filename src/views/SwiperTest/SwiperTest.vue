<template>
  <BaseSwiper :slides="items">
    <div
      slot-scope="{slide}"
      v-text="slide.text"
    />
  </BaseSwiper>
</template>

<script>
/**
 * * SwiperTest
 */

import BaseSwiper from 'Base/BaseSwiper/BaseSwiper'

export default {
  name: 'SwiperTest',
  components: {
    BaseSwiper
  },
  data() {
    return {
      items: [
        { id: 1, text: 'test1' },
        { id: 2, text: 'test2' },
        { id: 3, text: 'test3' },
        { id: 4, text: 'test4' },
        { id: 5, text: 'test5' },
        { id: 6, text: 'test6' },
        { id: 7, text: 'test7' },
        { id: 8, text: 'test8' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.c-SwiperTest {
}
</style>
