<script setup lang="ts">
/**
 * * TailwindExample
 */
</script>

<template>
  <div class="TailwindExample">
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
  </div>
</template>
