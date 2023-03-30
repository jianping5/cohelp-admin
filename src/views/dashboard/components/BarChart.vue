<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
const animationDuration = 1250
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      data: [],
    }
  },
  mounted() {
    // 接受指定年份下的所有月的营业额
    this.data =  [792, 5244, 2020, 3334, 3290, 3320, 2220, 1123, 1255, 2325, 5632, 6123]
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          max: 7000,
          splitNumber: 7,
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'revenue',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.data,
          animationDuration
        }]
      })
    }
  }
}
</script>