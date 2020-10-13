<template>
  <div class="c-BasePdfViewer">
    <div class="c-BasePdfViewer-main">
      <slot>
        <div
          id="pdf-container"
          class="c-PDFViewerWp"
        >
          <div
            id="pdf-viewer"
            class="c-PDFViewer"
          />
        </div>
      </slot>
    </div>

    <transition
      name="el-fade-in"
      mode="out-in"
    >
      <div
        v-if="!isLoading"
        class="c-BasePdfViewer-opt"
      >
        <slot
          name="zoom-in"
          v-bind="{zoomIn}"
        >
          <button
            type="button"
            @click="zoomIn"
          >
            zoom-in
          </button>
        </slot>
        <slot
          name="zoom-out"
          v-bind="{zoomOut}"
        >
          <button
            type="button"
            @click="zoomOut"
          >
            zoom-out
          </button>
        </slot>
        <slot
          name="zoom-reset"
          v-bind="{zoomReset}"
        >
          <button
            type="button"
            @click="zoomReset"
          >
            zoom-reset
          </button>
        </slot>
      </div>
    </transition>

    <div class="c-BasePdfViewer-loading">
      <slot
        v-if="isLoading"
        name="loading"
        v-bind="{loaded,total}"
      >
        <p class="c-BasePdfViewer-text">
          {{ percentage }}%
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * * BasePdfViewer
 * * pdf预览(预览+缩放)
 * * 参照https://github.com/mozilla/pdf.js/blob/master/examples/components/simpleviewer.js实现
 */

const DEFAULT_SCALE_DELTA = 1.1
const MIN_SCALE = 0.25
const MAX_SCALE = 10.0

// 字符map目录
const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/'
const CMAP_PACKED = true

export default {
  name: 'BasePdfViewer',
  components: {},
  mixins: [],
  props: {
    url: {
      type: String,
      required: true
    },
    // 是否需要抓手工具
    needHandTool: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      total: 0, // 总尺寸
      loaded: 0, // 已加载尺寸

      isLoading: false
    }
  },
  computed: {
    percentage() {
      const per = Number(this.loaded / this.total * 100)
      return Number.isNaN(per) ? '0' : per.toFixed(2)
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      if (
        !window.pdfjsLib ||
      !window.pdfjsLib.getDocument ||
      !window.pdfjsViewer ||
      !window.pdfjsViewer.PDFViewer
      ) {
        console.log('😢请先引入pdfjs和pdfjsViewer')
        return
      }

      // 设置woker
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/es5/build/pdf.worker.js'

      const { EventBus, PDFLinkService, PDFViewer } = pdfjsViewer

      this.eventBus = new EventBus()

      this.pdfLinkService = new PDFLinkService({ eventBus: this.eventBus })

      this.pdfViewer = new PDFViewer({
        container: document.getElementById('pdf-container'),
        viewer: document.getElementById('pdf-viewer'),
        eventBus: this.eventBus,
        linkService: this.pdfLinkService,
        textLayerMode: 0, // 禁用文本
        useOnlyCssZoom: true
      })

      this.pdfLinkService.setViewer(this.pdfViewer)

      this.eventBus.on('pagesinit', this.handlePagesInit) // 监听页面初始化

      this.isLoading = true
      // 加载文档
      const loadingTask = pdfjsLib.getDocument({
        url: this.url,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED
      })

      loadingTask.onProgress = this.handleLoadingTaskProcessChange

      loadingTask.promise.then(this.handleLoadingTaskSuccess, this.handleLoadingTaskFail)
    },
    /**
     * 初始化抓手工具
     */
    initHandTool() {
      if (this.pdfCursorTools) return

      import('./lib/pdf-cursor-tools')
        .then(({ CursorTool, PDFCursorTools }) => {
          if (!CursorTool || !PDFCursorTools) throw new Error('load pdf-cursor-tools error')

          this.pdfCursorTools = new PDFCursorTools({
            container: document.getElementById('pdf-container'),
            eventBus: this.eventBus,
            cursorToolOnLoad: CursorTool.HAND
          })
          this.$emit('init-hand-tool-success', this.pdfCursorTools)
        })
        .catch(err => {
          console.log('initHandTool', err)
          this.$emit('init-hand-tool-error', err)
        })
    },
    /**
     * 处理页面初始化完成
     */
    handlePagesInit() {
      // 页面初始化完成，此时可对页面进行一些初始设置，例如缩放
      this.fitPageWidth()

      this.needHandTool && this.initHandTool() // 初始化抓手工具
    },
    /**
     * 处理文档加载任务进度变化
     */
    handleLoadingTaskProcessChange({ loaded, total }) {
      this.loaded = loaded
      !this.total && (this.total = total)
    },
    /**
     * 处理文档加载任务成功
     */
    handleLoadingTaskSuccess(pdfDocument) {
      // 文档加载完成，为viewer和其它可能的服务指定document
      this.pdfViewer.setDocument(pdfDocument)

      this.pdfLinkService.setDocument(pdfDocument, null)

      this.isLoading = false

      this.$emit('loading.task.success', pdfDocument)
    },
    /**
     * 处理文档加载任务失败
     */
    handleLoadingTaskFail(err) {
      console.log('loadingTask.promise', err)

      this.isLoading = false

      this.$emit('loading.task.error', err)
    },
    /**
     * 设置缩放为页面宽度
     */
    fitPageWidth() {
      this.pdfViewer &&
      this.pdfViewer.currentScaleValue !== 'page-width' &&
      (this.pdfViewer.currentScaleValue = 'page-width')
    },
    /**
     * 缩放重置
     */
    zoomReset() {
      this.fitPageWidth()
    },
    /**
     * 放大
     */
    zoomIn(ticks) {
      let newScale = this.pdfViewer.currentScale
      do {
        newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.ceil(newScale * 10) / 10
        newScale = Math.min(MAX_SCALE, newScale)
      } while (--ticks && newScale < MAX_SCALE)

      this.pdfViewer.currentScaleValue = newScale
    },
    /**
     * 缩小
     */
    zoomOut: function pdfViewZoomOut(ticks) {
      let newScale = this.pdfViewer.currentScale
      do {
        newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.floor(newScale * 10) / 10
        newScale = Math.max(MIN_SCALE, newScale)
      } while (--ticks && newScale > MIN_SCALE)

      this.pdfViewer.currentScaleValue = newScale
    }
  }
}
</script>

<style src="./index.css"></style>
