<template>
  <BaseSwiper
    :slides="items"
    class="c-SwiperTest"
  >
    <div
      slot-scope="{slide}"
      v-text="slide.rawHtml"
    />
    <BaseFormulaRender
      slot-scope="{slide}"
      :htmlString="slide.rawHtml"
    />
  </BaseSwiper>
</template>

<script>
/**
 * * SwiperTest
 */

import BaseSwiper from 'Base/BaseSwiper/BaseSwiper'
import BaseFormulaRender from 'Base/BaseFormulaRender'

import MOCK_DATA from 'Views/FormulaRenderTest/mock-data'

export default {
  name: 'SwiperTest',
  components: {
    BaseSwiper,
    BaseFormulaRender
  },
  data() {
    return {
      items: MOCK_DATA
    }
  }
}
</script>

<style lang="scss" scoped>
.c-SwiperTest {
  @extend %noSelect;
}
</style>
