<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import home from '@/api/home'

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
      default: '25%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      activityNum: [],
      helpNum: [],
      holeNum: [],
      askNum: []
    }
  },
  mounted() {
    // 接受当天的营业额
    home.getDayList().then(response => {
      console.log(response)
      this.activityNum = response.data.data?.activityNumber
      this.helpNum = response.data.data?.helpNumber
      // this.holeNum = response.data.data?.holeNumber
      this.askNum = response.data.data?.askNumber
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
        title: {
          text: '当天发布数占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '发布量',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.activityNum[0], name: '活动' },
              { value: this.helpNum[0], name: '互助' },
              // { value: this.holeNum[0], name: '树洞' },
              { value: this.askNum[0], name: '问题' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>