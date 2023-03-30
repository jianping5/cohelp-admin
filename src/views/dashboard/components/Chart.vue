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
      activityNumList: [],
      helpNumList: [],
      holeNumList: [],
      askNumList: [],
      viewObjList: [],
      monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  },
  mounted() {
    // 接受指定年份下的所有月的营业额
    // this.data =  [792, 5244, 2020, 3334, 3290, 3320, 2220, 1123, 1255, 2325, 5632, 6123]
    home.getYearList().then(response => {

      // this.viewObjList = []
      this.activityNumList = response.data.data?.activityNumber
      this.helpNumList = response.data.data?.helpNumber
      // this.holeNumList = response.data.data?.holeNumber
      this.askNumList = response.data.data?.askNumber
      for (let i=0; i<12; i++) {
        // this.viewObjList.push({ 'month': this.monthList[i], '活动': this.activityNumList[i], '互助': this.helpNumList[i], '树洞': this.holeNumList[i] })
        this.viewObjList.push({ 'month': this.monthList[i], '活动': this.activityNumList[i], '互助': this.helpNumList[i], '问题': this.askNumList[i] })
        // console.log({ 'month': this.monthList[i], '活动': this.activityNumList[i], '互助': this.helpNumList[i], '树洞': this.holeNumList[i] })
      }
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
          text: '年度发布数占比',
          left: 'center',
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        tooltip: {},
        dataset: {
          dimensions: ['month', '活动', '互助', '问题'],
          source: this.viewObjList
        },
        xAxis: [{
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      })
    }
  }
}
</script>