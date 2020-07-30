<template>
  <div class="c-ThemeChangeTest">
    <p class="c-Text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem asperiores, vel officia accusantium sed, nobis non quibusdam quam eos iusto eveniet provident, culpa incidunt ab reprehenderit veritatis! Animi, doloremque sapiente?
    </p>

    <button @click="handleBtnClick">
      切换主题
    </button>
    <button @click="handleDestroyedBtnClick">
      销毁ThemeService
    </button>
  </div>
</template>

<script>
/**
 * * ThemeChangeTest
 */

const themeMap = new Map([
  ['text-color-primary', 'red']
])

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
  beforeDestroy() {
    this.themeService && this.themeService.destroy()
    this.themeService = null
  },
  methods: {
    handleBtnClick() {
      this.applyTheme()
    },
    handleDestroyedBtnClick() {
      this.themeService && this.themeService.destroy()
      this.themeService = null
    },
    applyTheme() {
      if (!this.themeService) {
        import(/* webpackChunkName:'ThemeService' */'Plugins/theme-service.js')
          .then(({ default: ThemeService }) => {
            this.themeService = new ThemeService()

            this.themeService.applyTheme(themeMap)
          }).catch(err => {
            console.log(err)
          })
      } else {
        this.themeService.applyTheme(themeMap)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-ThemeChangeTest {
}

.c-Text {
  display: flex;

  color: $mainTextColor;
}
</style>
