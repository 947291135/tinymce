<template>
  <div class="lodding" v-if="display">
    <svg
      :width="widthSize"
      :height="heightSize"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-75 -75 150 150"
      preserveAspectRatio="xMidYMid meet"
      style="transform-origin: 50%;"

    >
      <circle
        :stroke="color"
        stroke-width="10"
        fill="none"
        cx="0"
        cy="0"
        r="70"
        opacity='.3'
      ></circle>
      <circle
        ref="percent"
        :stroke="color"
        stroke-width="10"
        fill="none"
        cx="0"
        cy="0"
        r="70"
        opacity='.5'
        stroke-linecap="round"
        stroke-dasharray="440"
        stroke-dashoffset="440"
        :style="{'transform':'rotate(-90deg)','transition':`${AnimateDelay}s`}"
      ></circle>
      <text
        ref="percentText"
        :stroke="color"
        opacity='.3'
        fill="none"
        dy="3"
        style="font-size:30px;user-select: none;"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        0%
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'percent',
  data () {
    return {
      display: true
    }
  },
  mounted () {
    this.percen()
  },
  methods: {
    percen () {
      let percentDom = this.$refs.percent
      let textDom = this.$refs.percentText
      // let XML_NS = 'http://www.w3.org/2000/svg'

      let all = percentDom.getAttribute('stroke-dasharray')
      let value = this.value > 100 ? 100 : this.value
      let percen = all - all * value * 0.01
      percentDom.setAttribute('stroke-dashoffset', percen)
      // 数字需不需要动画？
      this.NumAutoPlusAnimation(textDom, {
        time: Number(this.AnimateDelay) * 1000,
        num: value,
        regulator: 30
      })
      return `${value}%`
    },
    NumAutoPlusAnimation (targetEle, options) {
      /* 可以自己改造下传入的参数，按照自己的需求和喜好封装该函数 */
      // 不传配置就把它绑定在相应html元素的data-xxxx属性上吧
      options = options || {}
      let time = options.time || 2000
      let finalNum = options.num || 0 // 要显示的真实数值

      let regulator = options.regulator || 100 // 调速器，改变regulator的数值可以调节数字改变的速度
      regulator = finalNum === 0 ? 0 : regulator
      let step = finalNum / (time / regulator) /* 每30ms增加的数值-- */
      let count = 0 // 计数器
      let initial = 0
      var timer = setInterval(function () {
        count = count + step
        if (count >= finalNum) {
          clearInterval(timer)
          count = finalNum
        }
        // t未发生改变的话就直接返回
        // 避免调用text函数，提高DOM性能
        var t = Math.floor(count)
        if (t === initial) return
        initial = t
        targetEle.innerHTML = `${initial}%`
      }, 30)
    }
  },
  props: {
    value: {
      type: [Number, String],
      required: false,
      default: 0
    },
    color: {
      type: String,
      default: () => {
        return 'rgb(0,161,250)'
      }
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    unit: {
      type: String,
      default: () => {
        return 'px'
      }
    },
    AnimateDelay: {
      type: [Number, String],
      required: false,
      default: 2
    }
  },
  computed: {
    widthSize () {
      if (this.width === 'auto') {
        return '100%'
      }
      return this.width + this.unit
    },
    heightSize () {
      if (this.height === 'auto') {
        return '100%'
      }
      return this.height + this.unit
    }
  },
  watch: {
    value (news) {
      this.percen()
    }
  }
}
</script>

<style scoped>
.lodding{
  text-align: center;
  width: 100%;
  height: 100%;
  line-height: 0;
  font-size: 0
}
</style>
