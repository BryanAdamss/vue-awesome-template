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

const themeArr = [
  ['gh-brand-primary', 'red'],
  ['gh-text-size-huge', '30px'],
  ['gh-gutter-base', '50px'],
  ['gh-border-color', 'blue'],
  ['gh-theme-primary', 'yellow']
]

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

            this.themeService.applyTheme(themeArr)
          }).catch(err => {
            console.log(err)
          })
      } else {
        this.themeService.applyTheme(themeArr)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-ThemeChangeTest {
  * {
    transition: 0.3s;
  }
}

.c-Text {
  display: flex;
  padding: $gutter-base;

  color: $brand-primary;

  border: 1px solid $border-color;
}
</style>
