<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ThemeType, darkThemeInstance } from '@/services/instance/dark-theme-instance'

const env = import.meta.env

/* useGlobalState is auto import with  unplugin-auto-import */
const globalState = useGlobalState()
console.log(globalState.userInfo)

/* vue3 ref api is auto import with unplugin-auto-import */
const a = ref(3)

/* setup语法中无法使用this.$mc方式 */
/* messageCenterKey自动注入 */
const mc = inject(messageCenterKey)

const onClick = () => {
  mc?.emit('messageCenterBtnClick', `Msg from App.vue with MessageCenter and app.provide/inject ${Math.random()}`)
}
</script>

<template>
  <header class="bg-white dark:bg-slate-600">
    <img alt="Vue logo" class="logo" src="@/assets/svgs/logo.svg" width="125" height="125">

    <div class="wrapper">
      <h1 class="text-4xl caret-lime-50">
        hello tailwind
      </h1>
      <hr>
      <h2 class="text-3xl ">
        <!-- 生产环境替换Vue模板里import.meta.env时， 会出现Unexpected token -->
        <!-- 使用wbr兼容 -->
        <!-- https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement -->
        import.meta<wbr>.env
      </h2>
      <div class="bg-red-700">
        {{ env }}
      </div>
      <HelloWorld msg="You did it!" />

      <button class="bg-red-300 p-1 rounded hover:text-white" @click="onClick">
        messageCenterBtnClickUseProvide/inject
      </button>

      <nav>
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
        <RouterLink to="/tailwind-example">
          TailwindExample
        </RouterLink>
      </nav>

      <h1>主题</h1>
      <button type="button" @click="darkThemeInstance.setTheme(ThemeType.OS)">
        跟随系统
      </button>
      <button type="button" @click="darkThemeInstance.setTheme(ThemeType.MANUAL_DARK)">
        dark
      </button>
      <button type="button" @click="darkThemeInstance.setTheme(ThemeType.MANUAL_LIGHT)">
        light
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/styles/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
