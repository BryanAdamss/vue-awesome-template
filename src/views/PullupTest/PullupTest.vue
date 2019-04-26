<template>
  <div class="c-PullupTest">
    <ul
      v-pull-up="onPullup"
      ref="ul"
      class="c-List"
    >
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
    </ul>
  </div>
</template>

<script>
/**
 * * PullupTest
 */

// import pullUp from 'Directives/pull-up'

export default {
  name: 'PullupTest',
  // directives: {
  //   pullUp
  // },
  methods: {
    onPullup(pullupEnd) {
      console.log('onPullup')
      // const getNewList = new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     const num = Math.random() * 10
      //     console.log(num)
      //     resolve(num)
      //   }, 1500)
      // }).then(num => {
      //   console.log('timeEnd')
      //   let $li = document.createElement('li')
      //   $li.innerHTML = `new Li ${num}`
      //   this.$refs.ul.appendChild($li)
      //   pullupEnd()
      // })
    }
  }
}
</script>

<style scoped>
.c-List {
  height: 400px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  border: 1px solid blue;
}
</style>
