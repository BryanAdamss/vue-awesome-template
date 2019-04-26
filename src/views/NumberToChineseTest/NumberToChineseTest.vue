<template>
  <div class="c-NumberToChineseTest">
    <ul>
      <li
        v-for="(item,index) in items"
        :key="index"
      >
        {{ item }}<br> {{ item | numberToChn }}
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * * NumberToChineseTest
 */

import Num2Chn from 'Common/js/num-to-chn'
const numberToChn = new Num2Chn()

export default {
  name: 'NumberToChineseTest',
  filters: {
    numberToChn(val) {
      return numberToChn.transform(val)
    }
  },
  data() {
    return {
      items: [
        0,
        0.0,
        -0.3,
        0.3,
        0.3333333333333333333,
        1,
        2,
        10,
        11,
        20,
        23,
        301,
        123456,
        123.456789,
        -123.456789,
        123456789.987654321,
        1000,
        10000,
        100000,
        1000000,
        10000000,
        100000000,
        1000000000,
        10000000000,
        100000000000,
        1000000000000,
        10000000000000,
        100000000000000,
        1000000000000000,
        -1000000000000000,
        -1000000000000000.123123,
        10000000000000000
      ]
    }
  },
  created() {
    window.numberToChn = numberToChn
  }
}
</script>
