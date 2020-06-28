<template>
  <svg
    :height="option.size"
    :width="option.size"
    x-mlns="http://www.w3.org/200/svg"
  >
    <defs>
      <linearGradient
        :id="outGradientId"
        x1="1"
        y1="0"
        x2="0"
        y2="0"
      >
        <stop
          :stop-color="arcOption.outArcStartColor"
          offset="0%"
        />
        <stop
          :stop-color="arcOption.outArcEndColor"
          offset="100%"
        />
      </linearGradient>
      <linearGradient
        :id="innerGradientId"
        x1="1"
        y1="0"
        x2="0"
        y2="0"
      >
        <stop
          :stop-color="arcOption.innerArcStartColor"
          offset="0%"
        />
        <stop
          :stop-color="arcOption.innerArcEndColor"
          offset="100%"
        />
      </linearGradient>
    </defs>
    <circle
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke="option.backColor"
      :stroke-width="option.strokeWidth"
      fill="none"
    />
    <circle
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke-width="option.strokeWidth"
      :stroke-dasharray="`0,1000000`"
      :stroke="`url('#${innerGradientId}')`"
      transform="rotate(-90)"
      transform-origin="center"
      fill="none"
      stroke-linecap="round"
    >
      <animate
        :to="`${arcOption.innerArcLength},1000000`"
        :begin="arcOption.outDurtion"
        :dur="arcOption.innerDurtion"
        :from="`${arcOption.innerInitArcLength},1000000`"
        attributeName="stroke-dasharray"
        fill="freeze"
      />
    </circle>
    <circle
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke-width="option.strokeWidth"
      :stroke-dasharray="`${arcOption.outArcLength},1000000`"
      :stroke="`url('#${outGradientId}')`"
      fill="none"
      transform="rotate(-90)"
      transform-origin="center"
      stroke-linecap="round"
    >
      <animate
        :to="`${arcOption.outArcLength},1000000`"
        :dur="arcOption.outDurtion"
        begin="0s"
        from="0,1000000"
        attributeName="stroke-dasharray"
        fill="freeze"
      />
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'BaseCircleProgress',
  props: {
    progress: {
      type: Number,
      required: true
    },
    progressOption: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    outGradientId() {
      return `outGradient_${Math.random()}`
    },
    innerGradientId() {
      return `innerGradient_${Math.random()}`
    },
    arcOption () {
      const arcConfig = {}
      const circleLength = Math.floor(2 * Math.PI * this.option.radius)
      // 如果此时小于0.5 则只需要显示最外层的圆弧 里面的圆弧不需要画了
      // 时间计算 因为第二段的长度不见得等于第一段 所以不能平分时间 不然会导致第二端的速度出现骤降
      // 因此需要按照比例进行时间计算
      if (this.progress < 0.5) {
        arcConfig.outArcLength = this.progress * circleLength
        arcConfig.outDurtion = this.option.duration // 为初始设置的动画值
        arcConfig.innerArcLength = 0
        arcConfig.innerInitArcLength = 0 // 为动画做准备
        arcConfig.innerDurtion = 0
      } else {
        const time = this.option.duration.split('s')[0]
        arcConfig.outArcLength = 0.5 * circleLength
        arcConfig.outDurtion = (0.5 / this.progress) * time + 's' //
        arcConfig.innerArcLength = this.progress * circleLength
        arcConfig.innerInitArcLength = 0.5 * circleLength // 为动画做准备 此时从中间开始
        arcConfig.innerDurtion = ((this.progress - 0.5) / this.progress) * time + 's' // 为动画做准备 此时从中间开始
      }
      const tansfromColor = arr => `rgb(${arr[0]},${arr[1]},${arr[2]})`
      arcConfig.outArcStartColor = tansfromColor(this.option.startColor)
      arcConfig.outArcEndColor = tansfromColor(this.option.startColor.map((color, index) => color + (this.option.endColor[index] - color) / 2))
      arcConfig.innerArcStartColor = tansfromColor(this.option.endColor)
      arcConfig.innerArcEndColor = tansfromColor(this.option.startColor.map((color, index) => color + (this.option.endColor[index] - color) / 2))
      return arcConfig
    },
    option () {
      // 所有进度条的可配置项
      const baseOption = {
        radius: 100,
        strokeWidth: 20,
        backColor: '#E6E6E6',
        startColor: [249, 221, 180],
        endColor: [238, 171, 86],
        duration: '1s',
        step: 100
      }
      Object.assign(baseOption, this.progressOption)
      // 中心位置自动生成
      baseOption.cy = baseOption.cx = baseOption.radius + baseOption.strokeWidth
      baseOption.size = (baseOption.radius + baseOption.strokeWidth) * 2
      return baseOption
    }
  }
}
</script>
