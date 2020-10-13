<template>
  <div class="c-ToolBar">
    <div class="c-ToolBar-main">
      <p
        class="c-FileName"
        v-text="fileName"
      />
    </div>
    <div class="c-ToolBar-side">
      <div class="c-Opt">
        <div class="c-Opt-item">
          <span
            v-show="loadSuccess"
            class="c-Text"
          >
            <span v-text="pageNum" />
            /
            <span v-text="pageCount" />
          </span>
        </div>

        <div
          class="c-Opt-item"
          title="放大"
          @click="$emit('zoom-in')"
        >
          <span class="c-Icon">
            +
          </span>
        </div>
        <div
          class="c-Opt-item"
          title="缩小"
          @click="$emit('zoom-out')"
        >
          <span class="c-Icon">
            -
          </span>
        </div>
        <div
          class="c-Opt-item"
          title="还原"
          @click="$emit('zoom-reset')"
        >
          <span class="c-Icon">
            ⭯
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * * ToolBar
 */

export default {
  name: 'ToolBar',
  components: {},
  mixins: [],
  props: {
    fileName: {
      type: String,
      default: ''
    },
    loadSuccess: {
      type: Boolean,
      default: false
    },
    pageNum: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style src="./ToolBar.css"></style>
