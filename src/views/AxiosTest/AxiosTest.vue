<template>
  <div class="c-AxiosTest">
    <h2>测试axios返回的数据</h2>
    <ul ref="list" class="c-List">
      <li
        v-for="post in posts"
        :key="post.id"
        :class="{ 'is-overLen': post.isTitleOverLength() }"
        class="c-List-item"
        @click.stop="onListItemClick(post)"
      >
        {{ post.id }}:{{ post.title }}
      </li>
    </ul>
    <BaseLoading v-show="isLoading" />
  </div>
</template>

<script>
/**
 * * AxiosTest
 */

import BaseLoading from 'Base/BaseLoading'

import { formatGetPostRes } from 'Services/translator/axios-test'

import Post from './models/Post'

export default {
  name: 'AxiosTest',
  components: {
    BaseLoading
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // * 如果是从AxiosListDetailTest页面返回，则读取绑定在$root上的scrollTop
      if (from.name === 'AxiosListDetailTest') {
        alert('列表将被设置到原先位置')
        const lastScrollTop = vm.$root.$_scrollTop
        setTimeout(() => {
          // * 因为返回时有个300ms的动画，导致设置不生效，所以延迟了400ms，肉眼基本上看不到滚动过程
          // * 实际生产时，需要根据动画时间调整延迟
          vm.$refs.list.scrollTop = lastScrollTop
          // * 删除$root上绑定的数据
          delete vm.$root.$_scrollTop
        }, 400)
      }
    })
  },
  data() {
    return {
      posts: [],
      isLoading: false
    }
  },
  created() {
    this.isLoading = true
    // * 测试axios
    this.$api['common/getPost'](
      {},
      {
        // _noShowDefaultError: true
      }
    )
      .then(res => {
        console.log(res)
        this.posts = formatGetPostRes(res).map(post => new Post(post))

        console.log(this.posts)

        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        console.log('err', err)
      })
  },
  methods: {
    onListItemClick(post) {
      // * 点击列表item时，传递post的id、列表滚动位置以及当前路由名(返回判断)
      const scrollTop = this.$refs.list.scrollTop
      this.$router.push({
        name: 'AxiosListDetailTest',
        params: {
          id: post.id
        },
        query: {
          scrollTop,
          fromRouteName: this.$options.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-List {
  height: 500px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  border: 1px solid blue;

  &-item {
    & + & {
      border-top: 1px solid #aaa;
    }

    &.is-overLen {
      color: red;
    }
  }
}
</style>
