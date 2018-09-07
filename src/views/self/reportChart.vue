/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 17:01:37
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-06 18:28:21
 */
<template>
  <div class="report-chart">
    <tab v-model="tabIndex">
      <tab-item ><span>汇总</span></tab-item>
      <tab-item ><span>昨日</span></tab-item>
      <tab-item ><span>近七天</span></tab-item>
      <tab-item ><span>当月</span></tab-item>
      <tab-item ><span style="border: none;">近30天</span></tab-item>
    </tab>
    <div v-if="tabIndex === 0" class="tab-list">
      <ul>
        <li v-for="item in 6" :key="item">
          <span>客户总数</span>
          <span>150</span>
        </li>
      </ul>
    </div>
    <div v-if="tabIndex === 1">
      2
    </div>
    <div v-if="tabIndex === 2">
      3
    </div>
    <div v-if="tabIndex === 3">
      4
    </div>
    <div v-if="tabIndex === 4">
      5
    </div>
    <h3>成交率</h3>
    <div class="funnel clearfix">
      <div id="main"></div>
      <p>成交概率区间</p>
      <ul>
        <li>0~50%</li>
        <li>50%~80%</li>
        <li>80%~99%</li>
        <li>100%</li>
      </ul>
    </div>
    <h3>客户兴趣占比</h3>
    <div class="care clearfix">
      <div id="care"></div>
      <ul>
        <li>对公司感兴趣</li>
        <li>对产品感兴趣</li>
        <li>对我感兴趣</li>
      </ul>
    </div>
    <h3>与我互动</h3>
    <div class="action">
      <p v-for="(item, index) in countObj" :key="index" class="graph">
        <span>{{item.name}}</span>
        <i :style="{width: item.num + '%'}"></i>
        <b>{{item.num}}</b>
      </p>
    </div>
    <h3>近15日客户活跃度</h3>
    <div class="dynamic">
      <div id="dynamic"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Tab, TabItem } from 'vux'
export default {
  name: 'reportChart',
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      tabIndex: 0,
      countObj: [{
        name: '查看名片',
        num: 50
      }, {
        name: '查看动态',
        num: 10
      }, {
        name: '查看官网',
        num: 10
      }, {
        name: '查看产品',
        num: 10
      }, {
        name: '拨打电话',
        num: 10
      }]
    }
  },
  methods: {
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.setOption(option)
    },
    drawFunnel () {
      const option = {
        calculable: true,
        color: ['#3ec4d2', '#0fd35d', '#feab2b', '#ff5f1a'],
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            // x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              formatter: '{d}',
              emphasis: {
                textStyle: {
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 3
              }
            },
            data: [
              {value: 80, name: '点击'},
              {value: 60, name: '访问'},
              {value: 40, name: '咨询'},
              {value: 20, name: '订单'}
            ]
          }
        ]
      }
      this.drawChart(option, 'main')
    },
    drawCare () {
      const option = {
        color: ['#ff0000', '#feab2b', '#3ec4d2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            data: [
              {value: 335, name: '25%'},
              {value: 310, name: '40%'},
              {value: 234, name: '35%'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            }
          }
        ]
      }
      this.drawChart(option, 'care')
    },
    drawDynamic () {
      const option = {
        color: ['#5977fe'],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        grid: {
          top: '20',
          left: '15%'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          showSymbol: false,
          smooth: true
        }]
      }
      this.drawChart(option, 'dynamic')
    }
  },
  mounted () {
    this.drawFunnel()
    this.drawCare()
    this.drawDynamic()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.report-chart{
  overflow: auto;
  height: 100%;
  h3{
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.36rem;
    color: #717171;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .vux-tab-item{
    flex: 0 0 20%;
    span{
      height: 10px;
      width: 100%;
      float: left;
      line-height: 10px;
      margin-top: 15px;
      border-right: 1px solid #aaa;
    }
  }
  .tab-list{
    width: 100%;
    height: 6.5rem;
    padding: 0.3rem 0.2rem;
    li{
      width: 33.33%;
      float: left;
      padding:  0.1rem;
      margin-top: 0.3rem;
      text-align: center;
      height: 2.5rem;
      background: url('~@/assets/img/six.png') no-repeat center;
      background-size: contain;
      span{
        margin-top: 0.5rem;
        display: block;
        color: #717171;
        &:first-child{
          font-size: 0.26rem;
        }
        &:last-child{
          font-size: 0.46rem;
        }
      }
    }
  }
  .funnel{
    #main{
      width: 100%;
      height: 6rem;
    }
    p{
      text-align: center;
      font-size: 0.26rem;
      color: #717171;
      margin-bottom: 0.4rem;
    }
    ul{
      padding: 0 0.2rem;
    }
    li{
      float: left;
      width: 25%;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      color: #adbaff;
      margin-bottom: 0.4rem;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        top: 0.14rem;
        left: 0;
        width: 0.22rem;
        height: 0.22rem;
        border-radius: 0.22rem;
      }
      &:nth-child(1)::after{
        background-color: #3ec4d2;
      }
      &:nth-child(2)::after{
        background-color: #0fd35d;
      }
      &:nth-child(3)::after{
        background-color: #feab2b;
      }
      &:nth-child(4)::after{
        background-color: #3ec4d2;
      }
    }
  }
  .care{
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    #care{
      width: 100%;
      height: 3.6rem;
    }
    ul{
      padding: 0 0.2rem;
    }
    li{
      width: 33.33%;
      float: left;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      color: #717171;
      position: relative;
      margin-bottom: 0.4rem;
      &::after{
        content: '';
        position: absolute;
        top: 0.14rem;
        left: 0;
        width: 0.22rem;
        height: 0.22rem;
        border-radius: 0.22rem;
      }
      &:nth-child(1)::after{
        background-color: #ff0000;
      }
      &:nth-child(2)::after{
        background-color: #feab2b;
      }
      &:nth-child(3)::after{
        background-color: #3ec4d2;
      }
    }
  }
  .action{
    padding: 0.3rem;
    .graph{
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 0.3rem;
      span{
        width: 2rem;
        padding-left: 0.3rem;
        position: relative;
        &::after{
          content: '';
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          position: absolute;
          top: 0.05rem;
          left: 0;
        }
      }
      i{
        display: inline-block;
        height: 0.2rem;
        border-radius: 0.1rem;
        margin-left: 0.5rem;
      }
      &:nth-child(1){
        span::after{
          background-color: #ff0000;
        }
        i{
          background: linear-gradient(left, #cc00ff, #b1181a);
        }
      }
      &:nth-child(2){
        span::after{
          background-color: #653ffe;
        }
        i{
          background: linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(3){
        span::after{
          background-color: #73a6fb;
        }
        i{
          background: linear-gradient(left, #cc00ff, #6eaffb);
        }
      }
      &:nth-child(4){
        i{
          background: linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5){
        i{
          background: linear-gradient(left, #c781f9, #0fba40);
        }
      }
    }
  }
  .dynamic{
    #dynamic{
      width: 100%;
      height: 4rem;
    }
  }
}
</style>
