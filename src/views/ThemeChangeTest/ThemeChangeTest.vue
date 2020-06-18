<template>
  <div class="c-ThemeChangeTest">

    <p class="c-Text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem asperiores, vel officia accusantium sed, nobis non quibusdam quam eos iusto eveniet provident, culpa incidunt ab reprehenderit veritatis! Animi, doloremque sapiente?</p>

    <button @click="handleBtnClick">切换主题</button>
  </div>
</template>

<script>
/**
 * * ThemeChangeTest
 */

export default {
  name: 'ThemeChangeTest',
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
  mounted() {},
  methods: {
    handleBtnClick() {
      const themeMap = new Map([
        ['text-color-primary', 'red']
      ])

      const getCSSText = ([prop, value]) => `--${prop}:${value};`

      const cssText = `:root{${Array.from(themeMap.entries()).map(getCSSText).join()}}`

      const styEl = document.createElement('style')
      styEl.id = 'themeStyleEl'

      styEl.innerText = cssText

      document.head.appendChild(styEl)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-ThemeChangeTest {
}

.c-Text {
  color: $mainTextColor;
}
</style>
