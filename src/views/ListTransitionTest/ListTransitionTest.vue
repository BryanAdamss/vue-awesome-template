<template>
  <div class="c-ListTransitionTest">
    <BaseListTransition tag="ul">
      <li v-for="(item, index) in list" :key="item.msg" :data-index="index">
        {{ item.msg }}
        <span @click="deleteItem(index)">&times;</span>
      </li>
    </BaseListTransition>
  </div>
</template>

<script>
/**
 * * ListTransitionTest
 */

import BaseListTransition from 'Base/BaseListTransition'
export default {
  name: 'ListTransitionTest',
  components: {
    BaseListTransition
  },
  data() {
    return {
      query: '',
      list: [
        {
          msg: 'Bruce Lee'
        },
        {
          msg: 'Jackie Chan'
        },
        {
          msg: 'Chuck Norris'
        },
        {
          msg: 'Jet Li'
        },
        {
          msg: 'Kung Furry'
        },
        {
          msg: 'Chain Zhang'
        },
        {
          msg: 'Iris Zhao'
        }
      ]
    }
  },
  methods: {
    queryChange(e) {
      if (!this.$_queryChange) {
        this.$_queryChange = this.$debounce(function() {
          this.computedList = this.list.filter(item => {
            return (
              item.msg.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
            )
          })
        }, 300)
      }

      this.query = e.target.value

      this.$_queryChange()
    },
    deleteItem(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
