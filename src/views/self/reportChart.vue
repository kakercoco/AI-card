/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 17:01:37
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-16 19:55:30
 */
<template>
  <div class="report-chart">
    <tab v-model="tabIndex">
      <tab-item @on-item-click="tabItemClick"><span>汇总</span></tab-item>
      <tab-item @on-item-click="tabItemClick"><span>昨日</span></tab-item>
      <tab-item @on-item-click="tabItemClick"><span>近七天</span></tab-item>
      <tab-item @on-item-click="tabItemClick"><span>当月</span></tab-item>
      <tab-item @on-item-click="tabItemClick"><span style="border: none;">近30天</span></tab-item>
    </tab>
    <div class="tab-list">
      <ul>
        <li>
          <span>客户总数</span>
          <span>{{dataInfor.user_num.num}}</span>
        </li>
        <li>
          <span>跟进总数</span>
          <span>{{dataInfor.follow_num.num}}</span>
        </li>
        <li>
          <span>浏览总数</span>
          <span>{{dataInfor.look_num.num}}</span>
        </li>
        <li>
          <span>被转发总数</span>
          <span>{{dataInfor.transmit_num.num}}</span>
        </li>
        <li>
          <span>被保存总数</span>
          <span>{{dataInfor.save_num.num}}</span>
        </li>
        <li>
          <span>被点赞总数</span>
          <span>{{dataInfor.good_num.num}}</span>
        </li>
      </ul>
    </div>
    <h3>成交率</h3>
    <div class="funnel clearfix">
      <div id="main">
        <p>{{downChartInfor.num_1}}</p>
        <p>{{downChartInfor.num_2}}</p>
        <p>{{downChartInfor.num_3}}</p>
        <p>{{downChartInfor.num_4}}</p>
      </div>
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
    <h3>客户与我互动</h3>
    <div class="action">
      <p v-for="(item, index) in downChartInfor.for_me" :key="index" class="graph" v-if="item.num.num>0">
        <span>{{item.name}}</span>
        <i :style="{width: item.num.num/forTotal*100 + '%'}"></i>
        <b>{{item.num.num}}</b>
      </p>
    </div>
    <h3>近30日客户活跃度</h3>
    <div class="dynamic">
      <div id="dynamic"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Tab, TabItem } from 'vux'
import { getMyNums, getMyChart } from '@/api/chart'
export default {
  name: 'reportChart',
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      tabIndex: 0,
      dataInfor: {
        follow_num: {
          num: ''
        },
        good_num: {
          num: ''
        },
        look_num: {
          num: ''
        },
        save_num: {
          num: ''
        },
        transmit_num: {
          num: ''
        },
        user_num: {
          num: ''
        }
      },
      dynamicXData: [],
      dynamicYData: [],
      forTotal: 0,
      likeTotal: 0, // 兴趣总数
      downChartInfor: {
        like_company: 0,
        like_me: 0,
        like_product: 0,
        look_card: 0,
        look_dynamic: 0,
        look_phone: 0,
        look_product: 0,
        look_web: 0,
        num_1: 0,
        num_2: 0,
        num_3: 0,
        num_4: 0,
        user_avtive: {}
      }
    }
  },
  methods: {
    getMyTopChart () {
      const data = {
        time_type: this.tabIndex
      }
      getMyNums(data).then(res => {
        this.dataInfor = res.data
      })
    },
    tabItemClick () {
      this.getMyTopChart()
    },
    getMydownChart () {
      getMyChart().then(res => {
        this.downChartInfor = res.data
        for (const key in this.downChartInfor.user_avtive) {
          this.dynamicXData.push(key)
          this.dynamicYData.push(this.downChartInfor.user_avtive[key])
        }
        for (let i = 0; i < this.downChartInfor.for_me.length; i++) {
          const element = this.downChartInfor.for_me[i].num
          this.forTotal += element.num
        }
        this.likeTotal =
          this.downChartInfor.like_company.num +
          this.downChartInfor.like_me.num +
          this.downChartInfor.like_product.num
        if (this.likeTotal === 0) {
          this.likeTotal = 1
        }
        this.drawCare()
        this.drawDynamic()
      })
    },
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.setOption(option)
    },
    drawCare () {
      const option = {
        color: ['#ff0000', '#feab2b', '#3ec4d2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            center: ['50%', '54%'],
            // data: [
            //   {
            //     value: this.downChartInfor.like_company.num,
            //     name: `${(
            //       (this.downChartInfor.like_company.num / this.likeTotal) *
            //       100
            //     ).toFixed(1)}%`,
            //     label: {
            //       normal: {
            //         formatter: '{b} {c}%'
            //       }
            //     }
            //   },
            //   {
            //     value: this.downChartInfor.like_product.num,
            //     name: `${(
            //       (this.downChartInfor.like_product.num / this.likeTotal) *
            //       100
            //     ).toFixed(1)}%`,
            //     label: {
            //       normal: {
            //         formatter: '{b} {c}%'
            //       }
            //     }
            //   },
            //   {
            //     value: this.downChartInfor.like_me.num,
            //     name: `${(
            //       (this.downChartInfor.like_me.num / this.likeTotal) *
            //       100
            //     ).toFixed(1)}%`,
            //     label: {
            //       normal: {
            //         formatter: '{b} {c}%'
            //       }
            //     }
            //   }
            // ],
            data: [
              {
                value: `${(
                  (this.downChartInfor.like_company.num / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                name: '公司',
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              },
              {
                name: '产品',
                value: `${(
                  (this.downChartInfor.like_product.num / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              },
              {
                name: '个人',
                value: `${(
                  (this.downChartInfor.like_me.num / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              }
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
                show: true
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
          data: this.dynamicXData
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
        series: [
          {
            data: this.dynamicYData,
            type: 'line',
            showSymbol: false,
            smooth: true
          }
        ]
      }
      this.drawChart(option, 'dynamic')
    }
  },
  mounted () {
    this.getMyTopChart()
    this.getMydownChart()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.report-chart {
  overflow: auto;
  height: 100%;
  h3 {
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.36rem;
    color: #717171;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .vux-tab-item {
    flex: 0 0 20%;
    span {
      height: 10px;
      width: 100%;
      float: left;
      line-height: 10px;
      margin-top: 15px;
      border-right: 1px solid #aaa;
    }
  }
  .tab-list {
    width: 100%;
    height: 6.5rem;
    padding: 0.3rem 0.2rem;
    li {
      width: 33.33%;
      float: left;
      padding: 0.1rem;
      margin-top: 0.3rem;
      text-align: center;
      height: 2.5rem;
      background: url('~@/assets/img/six.png') no-repeat center;
      background-size: contain;
      span {
        margin-top: 0.5rem;
        display: block;
        color: #717171;
        &:first-child {
          font-size: 0.26rem;
        }
        &:last-child {
          font-size: 0.46rem;
        }
      }
    }
  }
  .funnel {
    #main {
      height: 6rem;
      width: 100%;
      padding-top: 1.3rem;
      p{
        text-align: center;
        height: 0.76rem;
        line-height: 0.76rem;
        margin-bottom: 0.35rem;
        color: #fff;
      }
      p:nth-child(1) {
        background: url('~@/assets/img/chart1.png') no-repeat center;
        background-size: contain;
      }
      p:nth-child(2) {
        background: url('~@/assets/img/chart2.png') no-repeat center;
        background-size: contain;
      }
      p:nth-child(3) {
        background: url('~@/assets/img/chart3.png') no-repeat center;
        background-size: contain;
      }
      p:nth-child(4) {
        background: url('~@/assets/img/chart4.png') no-repeat center;
        background-size: contain;
        line-height: 0.6rem;
      }
    }
    & > p {
      text-align: center;
      font-size: 0.26rem;
      color: #717171;
      margin-bottom: 0.4rem;
    }
    ul {
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.4rem;
    }
    li {
      // float: left;
      // width: 25%;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      color: #adbaff;
      position: relative;
      display: inline-flex;
      justify-content: left;
      padding-left: 0.3rem;
      margin: 0 0.2rem;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-60%);
        left: 0;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
      }
      &:nth-child(1)::after {
        background-color: #3ec4d2;
      }
      &:nth-child(2)::after {
        background-color: #0fd35d;
      }
      &:nth-child(3)::after {
        background-color: #feab2b;
      }
      &:nth-child(4)::after {
        background-color: #ff5f1a;
      }
    }
  }
  .care {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    #care {
      width: 100%;
      height: 3.8rem;
    }
    ul {
      padding: 0 0.2rem;
    }
    li {
      width: 33.33%;
      float: left;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      color: #717171;
      position: relative;
      margin-bottom: 0.4rem;
      &::after {
        content: '';
        position: absolute;
        top: 0.14rem;
        left: 0;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
      }
      &:nth-child(1)::after {
        background-color: #ff0000;
      }
      &:nth-child(2)::after {
        background-color: #feab2b;
      }
      &:nth-child(3)::after {
        background-color: #3ec4d2;
      }
    }
  }
  .action {
    padding: 0.3rem;
    .graph {
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 2rem;
        padding-left: 0.3rem;
        position: relative;
        // top: 0.24rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &::after {
          content: '';
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 0.24rem;
        }
      }
      i {
        max-width: 50%;
        display: inline-block;
        height: 0.2rem;
        border-radius: 0.1rem;
        margin-left: 0.3rem;
        position: relative;
        margin-right: 0.2rem;
      }
      &:nth-child(3n + 1) {
        span::after {
          background-color: #ff0000;
        }
      }
      &:nth-child(3n + 2) {
        span::after {
          background-color: #653ffe;
        }
      }
      &:nth-child(3n + 3) {
        span::after {
          background-color: #73a6fb;
        }
      }
      &:nth-child(5n + 1) {
        i {
          background: linear-gradient(left, #cc00ff, #b1181a);
          background: -webkit-linear-gradient(left, #cc00ff, #b1181a);
        }
      }
      &:nth-child(5n + 2) {
        i {
          background: linear-gradient(left, #cc00ff, #5747fe);
          background: -webkit-linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(5n + 3) {
        i {
          background: linear-gradient(left, #cc00ff, #6eaffb);
          background: -webkit-linear-gradient(left, #cc00ff, #6eaffb);
        }
      }
      &:nth-child(5n + 4) {
        i {
          background: linear-gradient(left, #cd01fd, #fd5b66);
          background: -webkit-linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5n + 5) {
        i {
          background: linear-gradient(left, #c781f9, #0fba40);
          background: -webkit-linear-gradient(left, #c781f9, #0fba40);
        }
      }
    }
  }
  .dynamic {
    #dynamic {
      width: 100%;
      height: 4rem;
    }
  }
}
</style>
