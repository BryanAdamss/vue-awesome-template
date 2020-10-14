<template>
  <div class="c-BasePdfViewer">
    <div class="c-BasePdfViewer-hd">
      <!-- 工具栏 -->
      <slot
        name="tool-bar"
        v-bind="{
          fileName,
          pageNum,
          pageCount,
          zoomIn,
          zoomOut,
          zoomReset,
          isLoading,
          loadFail,
          loadSuccess
        }"
      >
        <ToolBar
          :fileName="fileName"
          :pageNum="pageNum"
          :pageCount="pageCount"
          :showPage="loadSuccess"
          @zoom-in="zoomIn"
          @zoom-out="zoomOut"
          @zoom-reset="zoomReset"
        />
      </slot>
      <!-- 工具栏 end -->
    </div>
    <div class="c-BasePdfViewer-main">
      <!-- viewer -->
      <slot v-bind="{pdfViewer}">
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
      <!-- viewer -->

      <div class="c-BasePdfViewer-tips">
        <slot
          v-if="isLoading"
          name="loading"
          v-bind="{loaded,total}"
        >
          <p class="c-BasePdfViewer-text">
            {{ percentage }}%
          </p>
        </slot>
        <slot
          v-if="loadFail"
          name="tips"
        >
          <p class="c-BasePdfViewer-text">
            加载出错，请尝试其它方式预览
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * * BasePdfViewer
 * * pdf预览(预览+缩放)
 * * 参照https://github.com/mozilla/pdf.js/blob/master/examples/components/simpleviewer.js实现
 */

import ToolBar from './ToolBar'

const DEFAULT_SCALE_DELTA = 1.1
const MIN_SCALE = 0.25
const MAX_SCALE = 10.0

// 字符map目录
const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/'
const CMAP_PACKED = true

export default {
  name: 'BasePdfViewer',
  components: { ToolBar },
  mixins: [],
  props: {
    // 资源url
    url: {
      type: String,
      required: true
    },
    // 是否需要抓手工具
    needHandTool: {
      type: Boolean,
      default: true
    },
    // worker地址
    workerSrc: {
      type: String,
      default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/es5/build/pdf.worker.js'
    }
  },
  data() {
    return {
      total: 0, // 总尺寸
      loaded: 0, // 已加载尺寸

      pageNum: 1, // 页码
      pageCount: 0, // 总页数

      isLoading: false,
      loadSuccess: false,
      loadFail: false,

      pdfViewer: null // PDFViewer实例
    }
  },
  computed: {
    /**
     * 加载百分比
     */
    percentage() {
      const per = Number(this.loaded / this.total * 100)
      return Number.isNaN(per) ? '0' : per.toFixed(2)
    },
    /**
     * 文件名
     */
    fileName() {
      return this.getFileNameFromURL(this.url)
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.init()

    this.$once('hook:beforeDestory', this.clean)
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
      const container = document.getElementById('pdf-container')
      const viewer = document.getElementById('pdf-viewer')
      if (!container || !viewer) return

      this.container = container
      this.viewer = viewer

      // 设置woker
      pdfjsLib.GlobalWorkerOptions.workerSrc = this.workerSrc

      const { EventBus, PDFLinkService, PDFViewer } = pdfjsViewer

      const eventBus = new EventBus()
      this.eventBus = eventBus

      this.pdfLinkService = new PDFLinkService({ eventBus })

      this.pdfViewer = new PDFViewer({
        container,
        viewer,
        eventBus,
        linkService: this.pdfLinkService,
        textLayerMode: 0, // 禁用文本
        useOnlyCssZoom: true
      })

      this.pdfLinkService.setViewer(this.pdfViewer)

      eventBus.on('pagesinit', this.handlePagesInit) // 监听页面初始化
      eventBus.on('pagechanging', this.handlePageChanging) // 监听页码变化

      this.isLoading = true
      // 加载文档
      const loadingTask = pdfjsLib.getDocument({
        url: this.url,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED
      })

      loadingTask.onProgress = this.handleLoadingTaskProcessChange // 监听加载进度

      loadingTask.promise
        .then(this.handleLoadingTaskSuccess)
        .catch(this.handleLoadingTaskFail)
    },
    /**
     * 初始化抓手工具
     */
    initHandTool() {
      if (this.pdfCursorTools) return

      import(/* webpackChunkName:'pdf-cursor-tools' */'./lib/pdf-cursor-tools')
        .then(({ CursorTool, PDFCursorTools }) => {
          if (!CursorTool || !PDFCursorTools) throw new Error('load pdf-cursor-tools error')

          this.pdfCursorTools = new PDFCursorTools({
            container: this.container,
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
     * 从url解析文件名
     */
    getFileNameFromURL(url) {
      let title = pdfjsLib.getFilenameFromUrl(url) || url
      try {
        title = decodeURIComponent(title)
      } catch (e) {
      // decodeURIComponent may throw URIError,
      // fall back to using the unprocessed url in that case
      }

      return title
    },
    /**
     * 处理页码变化
     */
    handlePageChanging(obj) {
      obj.pageNumber != null && (this.pageNum = Number(obj.pageNumber))

      this.$emit('pdf-pagechanging', obj)
    },
    /**
     * 处理页面初始化完成
     * 此时可对页面进行一些初始设置，例如缩放
     */
    handlePagesInit() {
      this.fitPageWidth() // 适应页面宽度

      this.needHandTool && this.initHandTool() // 初始化抓手工具

      this.$emit('pdf-pagesinit', this.pdfViewer)
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

      this.pageCount = pdfDocument.numPages

      this.isLoading = false
      this.loadSuccess = true

      this.$emit('loading.task.success', pdfDocument)
    },
    /**
     * 处理文档加载任务失败
     */
    handleLoadingTaskFail(err) {
      console.log('loadingTask.promise', err)

      this.isLoading = false
      this.loadFail = true

      this.$emit('loading.task.error', err)
    },

    /**
     * 放大
     */
    zoomIn(ticks) {
      if (!this.pdfViewer || !this.container) return

      // 保存旧滚动位置、缩放比例以计算新位置
      const oldPos = this.getOldScrollPos()

      const newScale = this.getZoomInNewScale(this.pdfViewer.currentScale, ticks)
      this.pdfViewer.currentScaleValue = newScale

      this.back2OldPos(
        this.container,
        {
          ...oldPos,
          newScale
        }
      )
    },
    /**
     * 获取缩大的新比例
     */
    getZoomInNewScale(currentScale, ticks) {
      if (currentScale == null) return

      let newScale = currentScale
      do {
        newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.ceil(newScale * 10) / 10
        newScale = Math.min(MAX_SCALE, newScale)
      } while (--ticks && newScale < MAX_SCALE)

      return newScale
    },
    /**
     * 缩小
     */
    zoomOut(ticks) {
      if (!this.pdfViewer || !this.container) return

      // 保存旧滚动位置、缩放比例以计算新位置
      const oldPos = this.getOldScrollPos()

      const newScale = this.getZoomOutNewScale(this.pdfViewer.currentScale, ticks)
      this.pdfViewer.currentScaleValue = newScale

      this.back2OldPos(
        this.container,
        {
          ...oldPos,
          newScale
        }
      )
    },
    /**
     * 获取缩小的新比例
     */
    getZoomOutNewScale(currentScale, ticks) {
      if (currentScale == null) return

      let newScale = currentScale
      do {
        newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.floor(newScale * 10) / 10
        newScale = Math.max(MIN_SCALE, newScale)
      } while (--ticks && newScale > MIN_SCALE)

      return newScale
    },
    /**
     * 缩放重置
     */
    zoomReset() {
      // 保存旧滚动位置、缩放比例以计算新位置
      const oldPos = this.getOldScrollPos()

      this.fitPageWidth()

      this.back2OldPos(
        this.container,
        {
          ...oldPos,
          newScale: this.pdfViewer.currentScale
        }
      )
    },
    /**
     * 设置缩放为页面宽度
     */
    fitPageWidth() {
      // currentScaleValue string类型，支持预定义字符串
      // currentScale number类型，currentScaleValue会映射到一个具体的currentScale上
      // 设置二者，内部都会调用相同的_setScale，内部会尝试parseFloat
      this.pdfViewer &&
      this.pdfViewer.currentScaleValue !== 'page-width' &&
      (this.pdfViewer.currentScaleValue = 'page-width')
    },
    /**
     * 返回之前滚动位置
     */
    back2OldPos(el, pos) {
      if (!el) return

      const { scrollTop, scrollLeft } = this.calcNewScrollPos(pos)

      el.scrollTop = scrollTop
      el.scrollLeft = scrollLeft
    },
    /**
     * 获取旧滚动位置、缩放信息
     */
    getOldScrollPos() {
      if (!this.pdfViewer || !this.container) return {}

      return {
        oldScrollTop: this.container.scrollTop,
        oldScrollLeft: this.container.scrollLeft,
        oldScale: this.pdfViewer.currentScale
      }
    },
    /**
     * 计算新滚动位置
     */
    calcNewScrollPos({ oldScrollTop, oldScrollLeft, oldScale, newScale }) {
      const rate = newScale / oldScale

      return {
        scrollLeft: oldScrollLeft * rate,
        scrollTop: oldScrollTop * rate
      }
    },
    /**
     * 清理
     */
    clean() {
      this.pdfViewer && (this.pdfViewer = null)
      this.container && (this.container = null)
      this.viewer && (this.viewer = null)

      this.pdfCursorTools &&
      this.pdfCursorTools.handTool &&
      typeof this.pdfCursorTools.handTool.deactivate === 'function' &&
      this.pdfCursorTools.handTool.deactivate()
    }
  }
}
</script>

<style src="./BasePdfViewer.css"></style>
