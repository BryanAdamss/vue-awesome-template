<script setup lang="ts">
/**
 * * TailwindExample
 */
</script>

<template>
  <div class="TailwindExample">
    <h1>version:3.1.6</h1>
    <div class="border-2 border-blue-100 p-4">
      <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#hover-focus-and-active">
        hover state
      </a>
      <div class="bg-red-500 hover:bg-red-100">
        悬停我
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even">
          first、last
        </a>
      </h1>
      <div>
        <div class="first:bg-red-600">
          first:bg-red-10
        </div>
        <div class="first:bg-red-100">
          first:bg-red-10
        </div>
        <hr>
        <div class="last:bg-blue-100">
          last:bg-blue-10
        </div>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#form-states">
          disabled、focus、invalid
        </a>
      </h1>
      <input
        type="text" value="tbone" disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
      >
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state">
          group-{modifier}
        </a>
      </h1>
      <div class="group p-5 border-red-200 border-4">
        <div class="group-hover:text-red-100">
          悬停父元素，我颜色会变
        </div>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state">
          peer-{modifier}
        </a>
      </h1>
      <div class="peer">
        Im peer
      </div>
      <p class="peer-hover:bg-red-100">
        当我前面的peer元素悬停时，我会变色；
        基于~选择器原理
      </p>
      <p class="peer-hover:bg-red-100">
        当我前面的peer元素悬停时，我会变色
      </p>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#placeholder-text">Before and after</a>
      </h1>
      <div class="after:content-['我写在after::content中'] after:text-red-500" />
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#placeholder-text">Placeholder text</a>
      </h1>

      <input class="placeholder:italic placeholder:text-red-400" placeholder="Search for anything..." type="text" name="search">
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#file-input-buttons">File input buttons</a>

        <input
          type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm
      file:bg-violet-50 file:text-violet-700
    "
        >
      </h1>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#list-markers">
          List markers
        </a>
      </h1>

      <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3 text-blue-500">
        <li>5 cups chopped Porcini mushrooms</li>
        <li>1/2 cup of olive oil</li>
        <li>3lb of celery</li>
      </ul>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#highlighted-text">Highlighted text</a></h1>

      <div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
        选中变色
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#first-line-and-first-letter">First-line and first-letter</a></h1>

      <p
        class="first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left
"
      >
        首字母变大，首行全大写wo shi xiao xie<br>
      </p>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#dialog-backdrops">backdrops</a></h1>

      <dialog id="my-dialog" class="backdrop:bg-red-50">
        im in dialog
      </dialog>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#responsive-breakpoints">Responsive breakpoints</a></h1>

      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <div>a 3-column grid on mobile, a 4-column grid on medium-width screens</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-color-scheme">Prefers color scheme</a></h1>
      <div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          我的文字颜色将跟随系统的颜色设置而变化
        </h3>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#viewport-orientation">Viewport orientation</a></h1>
      <div>
        <div class="portrait:hidden">
          横屏可见
        </div>
        <div class="landscape:hidden">
          竖屏可见
        </div>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles">Print styles</a></h1>
      <article class="print:hidden">
        print时不可见
      </article>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#open-closed-state">Open/closed state</a></h1>
      <div class="max-w-lg mx-auto p-8">
        <details class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
            使用details、dialog元素时，可使用open modifer设置打开、关闭时样式
          </summary>
          <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <p>The mug is round. The jar is round. They should call it Roundtine.</p>
          </div>
        </details>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1>
        <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants">自定义modifier
        </a>
      </h1>
      <div>
        <pre>
        使用`[&选择器]:样式`可自定义任意变体
        `&`代表当前元素
        选择器中可以使用tailwind自带的和css选择器
        : 代表应用于当前元素
        _ 代表应用于后代元素，所有空格可用_代替
        + 兄弟选择器
        @ @语法，此语法前不需要使用&；可和&组合使用，&用{}包裹即可
        ...

        如
        [&:nth-child(3)]:underline代表当前元素的第三个展示下划线
        [&_p]:text-blue-500 代表当前元素的后代元素p的颜色为蓝色

        [&+p]:text-red-900 代表当前元素后面的p的颜色为红色

        [@supports(display:grid)]:grid 代表支持grid时当前元素应用display:grid
        [@media(min-width:1000px){&:hover}]:opacity-0 组合使用,大于100px悬停当前元素时，opactiy为0

        一个变体重复出现时，可使用plugin定义
        let plugin = require('tailwindcss/plugin')

        module.exports = {
          // ...
          plugins: [
            plugin(function ({ addVariant }) {
              // Add a `third` variant, ie. `third:pb-0`
              addVariant('third', '&:nth-child(3)')
            })
          ]
        }
        </pre>

        <ul>
          <li class="[&:nth-child(3)]:underline">
            [&:nth-child(3)]:underline
          </li>
          <li class="[&:nth-child(3)]:underline">
            3
          </li>
          <li class="[&:nth-child(3)]:underline">
            我有波浪线
          </li>
        </ul>

        <div class="[&_p]:text-blue-500">
          <p>[&_p]:text-blue-500</p>
          <ul>
            <li>
              <p>[&_p]:text-blue-500</p>
            </li>
            <!-- ... -->
          </ul>
        </div>

        <div class="[&+p]:text-red-900">
          我应用了[&+p]:text-red-900 class，我后面的p将变红
        </div>
        <p>[&+p]:text-red-900实际影响的p标签</p>

        <div class="flex [@supports(display:grid)]:grid">
          [@supports(display:grid)]:grid
          我在支持grid的浏览器上展示为display:grid
        </div>

        <div class="[@media(min-width:1000px){&:hover}]:opacity-0">
          在大于>100px窗口中选题我时，我将透明
        </div>
      </div>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/hover-focus-and-other-states#using-with-your-own-classes&quot;">使用自定义的utils类</a></h1>

      <pre>
        使用@layer将自定义utils添加到utilities层中
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer utilities {
          .content-auto {
            content-visibility: auto;
          }
        }
        div.lg:content-auto
      </pre>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/responsive-design">响应式</a></h1>
      <pre>
        默认断点
        sm、md、lg、xl、2xl
        640px、768px、1024px、1280px、1536px
      </pre>

      <ul>
        <li>
          <h2>移动端优先，tailwind断点和bootstrap一样是以min-width定义的</h2>
          <p>
            text-red-900 会在所有断点生效
            text-red-900 md:text-red-100 md以下red-900，以上red-100
          </p>
        </li>
        <li>
          <h2>自定义断点</h2>
          <pre>
          module.exports = {
            theme: {
              screens: {
                // 覆盖
                'sm': '576px',
                // => @media (min-width: 576px) { ... }

                'md': '960px',
                // => @media (min-width: 960px) { ... }

                'lg': '1440px',
                // => @media (min-width: 1440px) { ... }

                '3xl': '1600px',
                // 新增3xl
              },
            }
          }
          </pre>
        </li>
      </ul>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/dark-mode">深色模式</a></h1>

      <ul>
        <li>
          <h2>默认tailwind使用@media (prefers-color-scheme: dark)随系统切换深色</h2>
          <pre>
            module.exports = {
              darkMode: 'class',  // 手动模式，会在根节点添加dark类标识；默认media，跟随系统
              // ...
            }
          </pre>
        </li>
        <li>
          <h2>使用 Window.matchMedia() API 实现自动跟随系统+手动</h2>
          <pre>
          // On page load or when changing themes, best to add inline in `head` to avoid FOUC
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }

          // Whenever the user explicitly chooses light mode
          localStorage.theme = 'light'

          // Whenever the user explicitly chooses dark mode
          localStorage.theme = 'dark'

          // Whenever the user explicitly chooses to respect the OS preference
          localStorage.removeItem('theme')
          </pre>
        </li>
        <li>
          <h2>自定义dark样式类名</h2>
          <p>
            module.exports = {
            darkMode: ['class', '[data-mode="dark"]'],
            // ...
            }
          </p>
        </li>
      </ul>
    </div>

    <div class="border-2 border-blue-100 p-4 mt-2">
      <h1><a href="https://tailwindcss.com/docs/adding-custom-styles">自定义</a></h1>

      <ul>
        <li>
          <h2>自定义主题</h2>
          <pre>
            module.exports = {
              theme: {
                screens: {
                  sm: '480px',
                  md: '768px',
                  lg: '976px',
                  xl: '1440px',
                },
                colors: {
                  'blue': '#1fb6ff',
                  'pink': '#ff49db',
                  'orange': '#ff7849',
                  'green': '#13ce66',
                  'gray-dark': '#273444',
                  'gray': '#8492a6',
                  'gray-light': '#d3dce6',
                },
                fontFamily: {
                  sans: ['Graphik', 'sans-serif'],
                  serif: ['Merriweather', 'serif'],
                },
                extend: {
                  spacing: {
                    '128': '32rem',
                    '144': '36rem',
                  },
                  borderRadius: {
                    '4xl': '2rem',
                  }
                }
              }
            }
          </pre>
        </li>
        <li>
          <h2>使用任意值</h2>
          <pre>
            包裹在[]中的值会被解析并应用
            class="top-[117px]">
            // -> top:117px
          </pre>
        </li>
        <li>
          <h2>使用tailwind未定义的样式属性</h2>
          <pre>
            class="[mask-type:luminance]"
            // -> mask-type: luminance

            hover:[mask-type:alpha]
            // hover:{mask-type:alpha}

            // 同样适用于css var
            class="[--scroll-offset:56px] lg:[--scroll-offset:44px]"
          </pre>
        </li>
        <li>
          <h2>处理空格</h2>
          <pre>
            使用_代替空格
            class="grid grid-cols-[1fr_500px_2fr]"
            [&_p:mt-4]

            部分需要保留_的场景，转义即可
            class="before:content-['hello\_world']"

            部分空格非法的场景，_不会被替换为空格
            class="bg-[url('/what_a_rush.png')]"
          </pre>
        </li>
        <li>
          <h2>解决歧义</h2>
          <pre>
            text-black、text-lg共用text命名空间，但一个表示color，一个表示font-size

            使用任意值时，tailwind会根据值类型自动转换
            class="text-[1px]" -> font-size:1px;
            class="text-[#f00]" -> color:#f00;

            cssvar时，tailwind无法区分，需要提示
            class="text-[var(--my-var)]"

            class="text-[length:var(--my-var)]" -> font-size
            class="text-[color:var(--my-var)]" -> color
          </pre>
        </li>
        <li>
          <h2>添加自定义css规则</h2>
          <pre>
            tailwind遵循ITCSS分层原则组织css规则
            link: https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/#what-is-itcss

            base->componets->utils：普遍->具体，低权重->高权重，utils覆盖components、components覆盖base

            // entry.css
            @tailwind base;
            @tailwind components;

            /* This will always be included in your compiled CSS */
            // 如果使用@layer声明却没用，则会自动被剔除
            // 不使用@layer则不会，即使没使用也会保留
            // 但需要注意顺序，.card本质属于component层，为了保证其仍可以被utils覆盖，必须声明在@layer utils之前
            .card {
              /* ... */
            }

            @tailwind utilities;

            // 类似reset.css
            @layer base {
              h1 {
                @apply text-2xl;
              }
              h2 {
                @apply text-xl;
              }
            }

            // 定义可重用的样式类集合
            @layer components {
              .btn-blue {
                @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
              }
            }

            // 定义utils类，一个utils只包含一条规则
            @layer utilities {
              .filter-none {
                filter: none;
              }
              .filter-grayscale {
                filter: grayscale(100%);
              }
            }
          </pre>
        </li>
        <li>
          <h2>vue sfc中style模块使用@layer 引入新样式不生效，因为vue分开使用postcss插件处理每个sfc的style模块，每个sfc是隔离的，tailwind无法获取到声明内容</h2>
          <pre>
          // xxx.vue中使用@layer

          /* Won't work because this file is processed in isolation */
          @layer components {
            div {
              background-color: theme('colors.white');
              border-radius: theme('borderRadius.lg');
              padding: theme('spacing.6');
              box-shadow: theme('boxShadow.xl');
            }
          }

          // 解决方案，不在sfc中使用@layer或使用tailwind utils取代components声明
          div {
            background-color: theme('colors.white');
            border-radius: theme('borderRadius.lg');
            padding: theme('spacing.6');
            box-shadow: theme('boxShadow.xl');
          }
          </pre>
        </li>
      </ul>
    </div>
  </div>
</template>
