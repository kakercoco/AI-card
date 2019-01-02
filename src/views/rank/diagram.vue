<template>
  <div class="diagram-index">
    <div class="dynamic">
      <div class="dynamic-title clearfix">
        <p class="title fl">{{info.username}}获客曲线图</p>
        <p class="title fr">获客数<span>{{totalClientNumber}}</span></p>
      </div>
      <div id="dynamic"></div>
    </div>
  </div>
</template>

<script>
import { XSwitch, PopupHeader, Popup, TransferDom, Group, AlertModule, InlineXSwitch } from 'vux'
import { getRankDetail } from '@/api/rank'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
export default {
  name: 'historyRank',
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupHeader,
    Popup,
    XSwitch,
    AlertModule,
    InlineXSwitch
  },
  data () {
    return {
      info: {},
      totalClientNumber: 0,
      isWeek: true,
      activeXData: [], // 折线图数据
      activeYData: [], // 折线图数据
      no_data: false
    }
  },
  methods: {
    getStr (arr, startIndex, endIndex) {
      let str = ''
      for (let i = startIndex; i < endIndex; i++) {
        str = str + arr[i]
      }
      return str
    },
    dataFormate (data, type) {
      let list = []
      if (typeof (data) === 'number') {
        data = data.toString()
        list = data.split('')
      } else {
        list = data.split('')
      }
      let str = ''
      if (list.length > 0) {
        let year = this.getStr(list, 0, 4)
        let mounth = this.getStr(list, 4, 6)
        let day = this.getStr(list, 6, 8)
        if (type === 1) {
          str = day
        } else {
          str = year + '年' + mounth + '月' + day + '日'
        }
      }
      return str
    },
    rankDetail () {
      this.$store.commit('app/open_global_dialog')
      let eid = this.$route.query.eid !== undefined ? this.$route.query.eid : ''
      getRankDetail(eid).then(res => {
        this.$store.commit('app/close_global_dialog')
        if (res.code === 200) {
          if (res.data.rank) {
            let list = res.data.rank
            this.info = res.data.info
            let xData = []
            let yData = []
            for (let key in list) {
              let newDate = this.dataFormate(list[key].day, 1)
              xData.push(newDate)
              this.totalClientNumber = this.totalClientNumber + list[key].customercount
              yData.push(list[key].customercount)
            }
            this.activeXData = xData
            this.activeYData = yData
            this.$nextTick(() => {
              this.drawDynamic()
            })
          }
        }
      }).catch((e) => {
        this.$store.commit('app/close_global_dialog')
      })
    },
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.clear()
      myChart.setOption(option)
    },
    drawDynamic () {
      const option = {
        color: ['#5977fe'],
        xAxis: {
          type: 'category',
          data: this.activeXData
        },
        yAxis: {
          type: 'value',
          axisLine: {onZero: false},
          axisLabel: {
            formatter: '{value}'
          }
          // splitLine: {
          //   show: false
          // }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '获客数:{c}',
          axisPointer: {
            animation: false,
            lineStyle: {
              color: '#00FF00'
            }
          }
        },
        grid: {
          top: '20',
          left: '15%'
        },
        series: [
          {
            name: '',
            data: this.activeYData,
            type: 'line',
            showSymbol: false,
            smooth: true
          }
        ]
      }
      this.drawChart(option, 'dynamic')
    }
  },
  watch: {
  },

  mounted () {
    this.rankDetail()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.diagram-index{
  height: 100%;
  -webkit-overflow-scrolling: touch;
  background-color: #f7f7f7;
  padding-top: 0.3rem;
  .dynamic {
    margin: 0 0.17rem 0 0.13rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 0.1rem;
    .dynamic-title{
      border-bottom: 1px solid #e5e5e5;
      height: 0.9rem;
      padding: 0.1rem 0.4rem 0 0.3rem;
      .title{
        padding-top: 0.1rem;
        display: inline-block;
        height: 0.9rem;
        text-align: left;
        font-size: 0.33rem;
        line-height: 0.5rem;
        color: #666666;
        font-family: '\9ED1\4F53',serif;
        span{
          font-size: 0.36rem;
          line-height: 0.5rem;
          font-family: 'Arial Regular',serif;
          padding-left: 0.3rem;
        }
      }
    }
    #dynamic {
      width: 100%;
      height: 4rem;
    }
  }
}
</style>
