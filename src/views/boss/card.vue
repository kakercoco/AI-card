/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-12 19:33:04
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-12 20:42:47
 */
<template>
  <div class="boss-card">
    <div class="header-bg">
      <div class="self-card">
        <img src="@/assets/img/u112.png" alt="">
        <div class="infor">
          <p>Top Man</p>
          <p>销售总监 158xxxxxxxx</p>
          <p>上海珍岛集团虹口区xx号</p>
        </div>
        <div class="card">
          <img src="@/assets/img/card2.png" alt="" class="card-icon">
          <span>扫码名片</span>
          <img src="@/assets/img/code.png" alt="" class="code-icon">
        </div>
      </div>
    </div>
    <p class="line"></p>
    <div>
      <tab v-model="activeName" :line-width="0">
        <tab-item>雷达能力图</tab-item>
        <tab-item>数据分析</tab-item>
        <tab-item>
          <p class="action-name">
            <popup-radio :options="options" v-model="option" value-text-align="center"></popup-radio>
          </p>
        </tab-item>
      </tab>
      <div v-show="activeName === 0" class="boss-power">
        <div id="top-chart"></div>
        <p class="tac">目前总排名列：第 <i style="color:red;">10</i> 位</p>
        <ul>
          <li>
            <span>88</span>
            <i>客户总数</i>
          </li>
          <li>
            <span>88</span>
            <i>跟进总数</i>
          </li>
          <li>
            <span>88</span>
            <i>咨询总数</i>
          </li>
        </ul>
      </div>
      <div v-show="activeName === 1" class="boss-data">
        <tab v-model="dataTabIndex" :line-width="0">
          <tab-item ><span>汇总</span></tab-item>
          <tab-item ><span>昨日</span></tab-item>
          <tab-item ><span>近7天</span></tab-item>
          <tab-item ><span>当月</span></tab-item>
          <tab-item ><span style="border: none;">近30天</span></tab-item>
        </tab>
        <div v-show="dataTabIndex === 0" class="second-tab-list">
          <ul>
            <li v-for="item in 6" :key="item">
              <span>客户总数</span>
              <span>150</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 1" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="item in 6" :key="item">
              <span>客户总数</span>
              <span class="blue">-136.4%</span>
              <span class="blue">327</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 2">
          1-3
        </div>
        <div v-show="dataTabIndex === 3" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="item in 6" :key="item">
              <span>客户总数</span>
              <span class="red">+136.4%</span>
              <span class="red">327</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 4">
          1-5
        </div>
      </div>
      <div v-show="activeName === 2">
        3
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, PopupPicker, PopupRadio } from 'vux'
import echarts from 'echarts'

export default {
  name: 'bossCard',
  components: {
    Tab,
    TabItem,
    PopupRadio,
    PopupPicker
  },
  data () {
    return {
      activeName: 0, // boss雷达主tab
      dataTabIndex: 0, // boss雷达日期tab
      option: '互动跟进',
      options: ['互动跟进', '互动记录', '跟进记录']
    }
  },
  methods: {
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.clear()
      myChart.setOption(option)
    },
    drawAITop () {
      const option = {
        tooltip: {

        },
        radar: {

        // shape: 'circle',
          name: {
            textStyle: {
              color: '#333',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: 50,
          indicator: [
            {name: '个人能力', max: 6500},
            {name: '获客能力', max: 16000},
            {name: '客户互动', max: 30000},
            {name: '官网推广', max: 38000},
            {name: '产品推广', max: 52000},
            {name: '销售主动性', max: 25000}
          ],

          axisLine: {
            lineStyle: {
              color: '#82abff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#82abff'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#fff']
            }
          }
        },
        series: [{

          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          areaStyle: {
            color: '#b9d0ff'
          },
          data: [

            {
              symbolSize: 0,
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '数量',
              label: {
                normal: {
                  show: false,
                  color: '#333'
                }
              },
              lineStyle: {
                width: 0
              }
            }
          ]
        }]
      }
      this.drawChart(option, 'top-chart')
    }
  },
  mounted () {
    this.drawAITop()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.boss-card{
  .header-bg{
    background: url('~@/assets/img/tabbar.png') no-repeat top;
    background-size: contain;
    position: relative;
    padding: 0.5rem 0;
  }
  .self-card{
    padding: 0.4rem;
    width: 6.5rem;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.1rem;
    box-shadow: 0 0 2px #aaa;
    &>img{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: .1rem;
      margin-bottom: 0.3rem;
    }
    .infor{
      float: left;
      width: calc(100% - 1.7rem);
      margin-left: 0.2rem;
      p{
        font-size: 0.28rem;
        color: #717171;
        &:first-child{
          font-size: 0.34rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .card{
      border-top: 1px solid #ddd;
      height: 0.9rem;
      line-height: 0.65rem;
      padding-top: 0.25rem;
      clear: both;
      .card-icon{
        float: left;
        width: 0.85rem;
        margin-right: 0.2rem;
      }
      span{
        color: #717171;
        font-size: 0.32rem;
      }
      .code-icon{
        float: right;
        width: 0.35rem;
        margin-top: 0.15rem;
      }
    }
  }
  .vux-tab-selected{
    & /deep/ .weui-cell__ft{
      color: #5977fe;
    }
  }
  .action-name{
    & /deep/ .weui-cell{
      padding: 0;
      .weui-cell__ft{
        width: 100%;
        text-align: center;
        &::after{
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 0px 2px 2px 0;
          border-color: #C8C8CD;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -0.16rem;
          right: 0.36rem;
        }
      }
    }
  }
  .line{
    background-color: #f3f3f3;
    height: 0.15rem;
  }
  .boss-power{
    #top-chart{
      height: 3.6rem;
    }
    p{
      margin-bottom: 0.3rem;
    }
    li{
      text-align: center;
      height: 1rem;
      float: left;
      width: 33.33%;
      span{
        display: block;
        color: #5977fe;
        font-size: 0.34rem;
      }
      i{
        font-size: 0.26rem;
        display: block;
        margin-top: 0.1rem;
      }
    }
  }
  .boss-data{
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
  }
  .second-tab-list{
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
        &.red{
          color: #ff0000;
        }
        &.blue{
          color: #00ea48;
        }
        &:first-child{
          font-size: 0.26rem;
        }
        &:last-child{
          font-size: 0.46rem;
        }
      }
    }
  }
  .second-nav-list-2{
    li{
      span{
        margin-top: 0;
        &:first-child{
          font-size: 0.26rem;
          margin-top: 0.5rem;
        }
        &:nth-of-type(2) {
          font-size: 0.36rem;
          margin-top: 0.2rem;
        }
        &:last-child{
          margin-top: 0.2rem;
          font-size: 0.28rem;
        }
      }
    }
  }
}
</style>
